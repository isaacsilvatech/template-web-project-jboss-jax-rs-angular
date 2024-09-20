package br.eti.ljr.sn.templatesrv.filter;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Objects;

import javax.annotation.Priority;
import javax.ejb.EJB;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import br.eti.ljr.sn.templatesrv.business.LoginBss;
import br.eti.ljr.sn.templatesrv.business.PermissaoBss;
import br.eti.ljr.sn.templatesrv.business.PessoaBss;
import br.eti.ljr.sn.templatesrv.domain.Pessoa;
import br.eti.ljr.sn.templatesrv.dto.TokenDto;
import br.eti.ljr.sn.templatesrv.exception.NaoPermitidoException;
import br.eti.ljr.sn.templatesrv.manager.TokenManager;
import io.jsonwebtoken.Claims;

@Provider
@Logado
@Priority(Priorities.AUTHENTICATION)
public class LogadoFilter implements ContainerRequestFilter {

	@Context
	private ResourceInfo resourceInfo;

	@Inject
	@PessoaLogada
	private Event<Pessoa> pessoaLogadaEvent;

	@Inject
	@PessoaLogada
	private Event<TokenDto> tokenEvent;

	@EJB
	private TokenManager tokenManager;

	@EJB
	private PermissaoBss permissaoBss;

	@EJB
	private PessoaBss pessoaBss;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

		try {
			String token = authorizationHeader.substring("Bearer".length()).trim();

			Claims body = tokenManager.getBody(token);

			Long matricula = Long.valueOf(String.valueOf(body.get("matricula")));

			Pessoa pessoaLogada = pessoaBss.getEntityByMatricula(matricula);

			if (Objects.isNull(pessoaLogada)) {
				throw new NaoPermitidoException("Você não tem permissão para acessar esse módulo!");
			}

			isPermitidoClasse(pessoaLogada.getCodPessoa());
			isPermitidoMetodo(pessoaLogada.getCodPessoa());

			pessoaLogadaEvent.fire(pessoaLogada);
			tokenEvent.fire(new TokenDto(token));

		} catch (NaoPermitidoException e) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build());
		} catch (Exception e) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
		}
	}

	private void isPermitidoClasse(Long codPessoaLogada) throws NaoPermitidoException {
		Class<?> resourceClass = resourceInfo.getResourceClass();
		Logado classAnnot = resourceClass.getAnnotation(Logado.class);
		if (classAnnot != null && !classAnnot.value().isEmpty()) {
			String chave = classAnnot.value();
			permissaoBss.isPermitido(LoginBss.COD_SISTEMA, chave, codPessoaLogada);
		}
	}

	private void isPermitidoMetodo(Long codPessoaLogada) throws NaoPermitidoException {
		Method resourceMethod = resourceInfo.getResourceMethod();
		Logado methodAnnot = resourceMethod.getAnnotation(Logado.class);
		if (methodAnnot != null && !methodAnnot.value().isEmpty()) {
			String chave = methodAnnot.value();
			permissaoBss.isPermitido(LoginBss.COD_SISTEMA, chave, codPessoaLogada);
		}
	}
}
