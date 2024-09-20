package br.eti.ljr.sn.templatesrv.producer;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.Produces;

import br.eti.ljr.sn.templatesrv.dto.TokenDto;
import br.eti.ljr.sn.templatesrv.filter.TokenApi;

@RequestScoped
public class TokenProducer {

	@Produces
	@RequestScoped
	@TokenApi
	private TokenDto token = new TokenDto();

	public void handleAuthenticationEvent(@Observes @TokenApi TokenDto token) {

		this.token.setToken(token.getToken());
	}
}
