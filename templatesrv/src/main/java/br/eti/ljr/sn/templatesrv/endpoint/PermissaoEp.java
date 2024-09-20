package br.eti.ljr.sn.templatesrv.endpoint;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.eti.ljr.sn.templatesrv.business.AdmBss;
import br.eti.ljr.sn.templatesrv.business.LoginBss;
import br.eti.ljr.sn.templatesrv.business.PermissaoBss;
import br.eti.ljr.sn.templatesrv.business.PessoaBss;
import br.eti.ljr.sn.templatesrv.domain.Pessoa;
import br.eti.ljr.sn.templatesrv.filter.Logado;
import br.eti.ljr.sn.templatesrv.filter.PessoaLogada;

@Logado
@Path("/permissao")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PermissaoEp {

	@Inject
	@PessoaLogada
	private Pessoa pessoaLoagada;

	@EJB
	private PermissaoBss permissaoBss;

	@EJB
	private PessoaBss pessoaBss;

	@EJB
	private AdmBss admBss;

	@GET
	@Path("/{chave}")
	public boolean isPermitido(@PathParam("chave") String chave) {
		return permissaoBss.isPermitido(LoginBss.COD_SISTEMA, chave, pessoaLoagada.getCodPessoa());

	}

	@GET
	@Path("/{chave}/{matricula}")
	public boolean isPermitido(@PathParam("chave") String chave, @PathParam("matricula") Long matricula) {
		Pessoa pessoa = pessoaBss.getEntityByMatricula(matricula);
		return permissaoBss.isPermitido(LoginBss.COD_SISTEMA, chave, pessoa.getCodPessoa());
	}
}
