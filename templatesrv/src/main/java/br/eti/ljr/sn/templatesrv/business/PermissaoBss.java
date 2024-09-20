package br.eti.ljr.sn.templatesrv.business;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.eti.ljr.sn.templatesrv.domain.Permissao;

@Stateless
public class PermissaoBss extends Bss<Permissao> {

	private static final long serialVersionUID = 1L;

	@EJB
	private AdmBss admBss;

	public boolean isPermitido(Integer codSistema, String chave, Long codPessoa) {

		Client client = ClientBuilder.newBuilder().build();

		String path = "/eps/permissao/" + codSistema + "/" + chave + "/" + codPessoa;
		Response response = client.target(admBss.getValor("URL_LOGIN")).path(path).request(MediaType.APPLICATION_JSON)
				.get();

		Boolean permitido = response.readEntity(Boolean.class);

		client.close();

		return permitido;
	}
}
