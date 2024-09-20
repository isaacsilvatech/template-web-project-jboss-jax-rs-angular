package br.eti.ljr.sn.templatesrv.producer;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;

import org.jboss.logging.Logger;

@Dependent
public class LoggerProducer {

	@Produces
	public Logger createLogger() {
		return Logger.getLogger("br.eti.ljr.sn.vendassrv");
	}
}
