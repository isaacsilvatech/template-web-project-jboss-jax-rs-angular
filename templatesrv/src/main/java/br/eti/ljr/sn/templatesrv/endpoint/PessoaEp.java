package br.eti.ljr.sn.templatesrv.endpoint;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.eti.ljr.sn.templatesrv.business.PessoaBss;
import br.eti.ljr.sn.templatesrv.domain.Pessoa;
import br.eti.ljr.sn.templatesrv.filter.Logado;

@Path("/pessoa")
@Logado
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PessoaEp {

	@EJB
	private PessoaBss pessoaBss;

	@GET
	@Path("/{codPessoa}")
	public Pessoa getEntity(@PathParam("codPessoa") Long codPessoa) {

		return pessoaBss.getEntity(codPessoa);
	}

	@GET
	@Path("/matricula/{matricula}")
	public Pessoa getEntityByMatricula(@PathParam("matricula") Long matricula) {

		return pessoaBss.getEntityByMatricula(matricula);
	}
}
