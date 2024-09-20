package br.eti.ljr.sn.templatesrv.business;

import java.io.Serializable;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.eti.ljr.sn.templatesrv.dto.LoginDto;

@Stateless
public class LoginBss implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final int COD_SISTEMA = 1;

	@EJB
	private AdmBss admBss;

	public LoginDto checkLogin(LoginDto loginVo) {

		Client client = ClientBuilder.newBuilder().build();

		loginVo.setCodSistema(COD_SISTEMA);
		loginVo.setChave("ENTRA");

		Response response = client.target(getUrl()).path("/eps/login/check").request(MediaType.APPLICATION_JSON)
				.post(Entity.entity(loginVo, MediaType.APPLICATION_JSON));

		LoginDto loginResponseVo = response.readEntity(LoginDto.class);

		client.close();

		return loginResponseVo;
	}

	public LoginDto alteraSenhaColaboradorVencida(LoginDto loginVo) {

		Client client = ClientBuilder.newBuilder().build();

		loginVo.setCodSistema(COD_SISTEMA);
		loginVo.setChave("ENTRA");

		Response response = client.target(getUrl()).path("/eps/login/altera-senha-vencida")
				.request(MediaType.APPLICATION_JSON).put(Entity.entity(loginVo, MediaType.APPLICATION_JSON));

		LoginDto loginResponseVo = response.readEntity(LoginDto.class);

		client.close();

		return loginResponseVo;
	}

	public LoginDto alteraSenhaColaborador(LoginDto loginVo) {

		Client client = ClientBuilder.newBuilder().build();

		loginVo.setCodSistema(COD_SISTEMA);
		loginVo.setChave("ENTRA");

		Response response = client.target(getUrl()).path("/eps/login/altera-senha").request(MediaType.APPLICATION_JSON)
				.put(Entity.entity(loginVo, MediaType.APPLICATION_JSON));

		LoginDto loginResponseVo = response.readEntity(LoginDto.class);

		client.close();

		return loginResponseVo;
	}

	private String getUrl() {
		return admBss.getValor("URL_LOGIN");
	}
}