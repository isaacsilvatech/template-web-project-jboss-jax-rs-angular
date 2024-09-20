package br.eti.ljr.sn.templatesrv.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class BssExceptionMapper implements ExceptionMapper<BssException> {

	@Override
	public Response toResponse(BssException ex) {

		return Response.status(Response.Status.BAD_REQUEST).entity(ex.getMessage()).build();
	}
}
