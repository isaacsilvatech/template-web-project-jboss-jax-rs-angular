package br.eti.ljr.sn.templatesrv.exception;

public class TokenException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public TokenException(String msg) {
		super(msg);
	}

	public TokenException(Throwable cause) {
		super(cause);
	}

}
