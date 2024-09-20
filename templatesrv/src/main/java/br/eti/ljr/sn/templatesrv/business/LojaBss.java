package br.eti.ljr.sn.templatesrv.business;

import java.util.List;

import javax.ejb.Stateless;

import br.eti.ljr.sn.templatesrv.domain.Loja;

@Stateless
public class LojaBss extends Bss<Loja> {

	private static final long serialVersionUID = 1L;

	public List<Object[]> getList(String apelido, String paginator) {

		StringBuilder sql = new StringBuilder();

		sql.append("""
				SELECT
					CODIGO,
					APELIDO

				FROM
					LOJA
				WHERE
					LOJA.CODIGO <> 0
				""");

		if (!apelido.equals("null") && !apelido.isEmpty()) {
			sql.append(" AND LOWER(LOJA.APELIDO) LIKE '%");
			sql.append(apelido.toLowerCase());
			sql.append("%'");
		}

		sql.append(" ORDER BY LOJA.CODIGO ");

		if (!paginator.equals("null")) {
			sql.append(" FETCH FIRST ");
			sql.append(paginator);
			sql.append(" ROWS ONLY ");
		}

		return dao.getListByNativeQueryTypeless(sql.toString());
	}

}
