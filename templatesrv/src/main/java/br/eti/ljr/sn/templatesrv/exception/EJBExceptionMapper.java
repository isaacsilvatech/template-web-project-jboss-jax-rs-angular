package br.eti.ljr.sn.templatesrv.exception;

import javax.ejb.EJBException;
import javax.ws.rs.client.ResponseProcessingException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class EJBExceptionMapper implements ExceptionMapper<EJBException> {

	@Override
	public Response toResponse(EJBException ex) {

		if (ex.getCause() instanceof ResponseProcessingException) {
			if (ex.getCause().getCause() instanceof BssException) {
				return Response.status(Response.Status.BAD_REQUEST).entity(ex.getCause().getCause().getMessage())
						.build();
			}
		}

		if (ex.getCause() instanceof BssException) {
			return Response.status(Response.Status.BAD_REQUEST).entity(ex.getCause().getMessage()).build();
		}

		return Response.status(Response.Status.BAD_REQUEST).entity(ex.getCause().getMessage()).build();
	}
}
