package br.eti.ljr.sn.templatesrv.manager;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.ejb.EJB;
import javax.ejb.Stateless;

import br.eti.ljr.sn.templatesrv.business.AdmBss;
import br.eti.ljr.sn.templatesrv.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Stateless
public class TokenManager {

	private static final String API_KEY = "API_KEY";

	@EJB
	private AdmBss admBss;

	private SecretKey getApiKey() {
		String apiKeyValue = admBss.getValor(API_KEY);
		return Keys.hmacShaKeyFor(apiKeyValue.getBytes(StandardCharsets.UTF_8));
	}

	public Claims getBody(String token) {
		try {
			return Jwts.parserBuilder().setSigningKey(getApiKey()).build().parseClaimsJws(token).getBody();
		} catch (Exception e) {
			throw new TokenException("Token inválido!");
		}
	}

}
