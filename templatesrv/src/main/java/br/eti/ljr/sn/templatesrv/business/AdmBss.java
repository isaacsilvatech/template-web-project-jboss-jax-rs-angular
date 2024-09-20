package br.eti.ljr.sn.templatesrv.business;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;

import br.eti.ljr.sn.templatesrv.domain.Adm;
import br.eti.ljr.sn.templatesrv.exception.BssException;

@Stateless
public class AdmBss extends Bss<Adm> {

	private static final long serialVersionUID = 1L;

	public String getValor(String parametro) throws BssException {
		try {
			Adm adm = dao.getEntity(parametro);
			return adm.getValor();
		} catch (NoResultException e) {
			throw new BssException("Parametro não existente.");
		}
	}

	public String getValor(String parametro, String cond) throws BssException {
		try {
			Adm adm = dao.getEntityByCond("parametro = '" + parametro + "' and " + cond);
			return adm.getValor();
		} catch (NoResultException e) {
			throw new BssException("Parametro não existente.");
		}
	}
}
