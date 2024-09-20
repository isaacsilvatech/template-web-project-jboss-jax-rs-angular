package br.eti.ljr.sn.templatesrv.filter;

import java.io.IOException;
import java.util.Scanner;

import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientResponseContext;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import br.eti.ljr.sn.templatesrv.exception.BssException;

@Provider
public class ClientResponseFilter implements javax.ws.rs.client.ClientResponseFilter {

	@Override
	public void filter(ClientRequestContext requestContext, ClientResponseContext responseContext) throws IOException {

		if (responseContext.getStatus() != Response.Status.OK.getStatusCode()) {

			Scanner sc = new Scanner(responseContext.getEntityStream());
			String error = sc.nextLine();
			sc.close();

			if (responseContext.getStatus() == Response.Status.BAD_REQUEST.getStatusCode()) {
				throw new BssException(error);
			}

			throw new RuntimeException("REQUEST ERROR: \n" + requestContext.getUri() + "\n" + error
					+ " \n STATUS_CODE: " + responseContext.getStatus());
		}
	}

}
