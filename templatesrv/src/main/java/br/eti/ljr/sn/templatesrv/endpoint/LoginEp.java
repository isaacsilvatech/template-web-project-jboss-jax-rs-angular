package br.eti.ljr.sn.templatesrv.endpoint;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.eti.ljr.sn.templatesrv.business.AdmBss;
import br.eti.ljr.sn.templatesrv.business.LoginBss;
import br.eti.ljr.sn.templatesrv.dto.LoginDto;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginEp {

	@EJB
	private LoginBss loginBss;

	@EJB
	private AdmBss admBss;

	@POST
	@Path("/check")
	public Response post(LoginDto login) {

		return Response.ok(loginBss.checkLogin(login)).build();
	}

	@PUT
	@Path("/altera-senha-vencida")
	public Response alteraSenhaVencida(LoginDto login) {

		return Response.ok(loginBss.alteraSenhaColaboradorVencida(login)).build();
	}

	@PUT
	@Path("/altera-senha")
	public Response alteraSenha(LoginDto login) {

		return Response.ok(loginBss.alteraSenhaColaborador(login)).build();
	}

}
