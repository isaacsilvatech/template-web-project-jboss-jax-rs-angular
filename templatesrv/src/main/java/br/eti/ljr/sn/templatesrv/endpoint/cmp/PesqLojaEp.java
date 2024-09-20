package br.eti.ljr.sn.templatesrv.endpoint.cmp;

import java.util.List;
import java.util.Objects;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.eti.ljr.sn.templatesrv.business.LojaBss;
import br.eti.ljr.sn.templatesrv.domain.Loja;
import br.eti.ljr.sn.templatesrv.dto.PesqLojaDto;
import br.eti.ljr.sn.templatesrv.filter.Logado;

@Logado
@Path("/cmp/pesq/loja")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PesqLojaEp {

	@EJB
	private LojaBss lojaBss;

	@GET
	@Path("{codigo}")
	public PesqLojaDto getEntity(@PathParam("codigo") Integer codigo) {

		Loja loja = lojaBss.getEntity(codigo);

		if (Objects.isNull(loja)) {
			return null;
		}

		PesqLojaDto vo = new PesqLojaDto();
		vo.setCodLoja(codigo);
		vo.setApelido(loja.getApelido());

		return vo;
	}

	@GET
	public List<Object[]> getList(@QueryParam("apelido") String apelido, @QueryParam("paginator") String paginator) {

		return lojaBss.getList(apelido, paginator);
	}
}
