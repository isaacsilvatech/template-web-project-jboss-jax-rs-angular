package br.eti.ljr.sn.templatesrv.filter;

import java.io.IOException;
import java.util.Objects;

import javax.inject.Inject;
import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.ext.Provider;

import br.eti.ljr.sn.templatesrv.dto.TokenDto;

@Provider
public class ClientRequestFilter implements javax.ws.rs.client.ClientRequestFilter {

	@TokenApi
	@Inject
	private TokenDto token;

	@Override
	public void filter(ClientRequestContext requestContext) throws IOException {

		if (Objects.nonNull(token) && Objects.nonNull(token.getToken())) {
			requestContext.getHeaders().add("Authorization", "Bearer " + token.getToken());
		}
	}

}
