package br.eti.ljr.sn.templatesrv.producer;

import javax.annotation.Resource;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

@Dependent
public class DataSourceProducer {
	
	@Resource(lookup = "java:jboss/datasources/snDataSource")
    private DataSource dataSource;

	@Produces
	public DataSource getDataSource() {
		
		return dataSource;
	}
	
}
