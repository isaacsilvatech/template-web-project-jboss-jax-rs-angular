package br.eti.ljr.sn.templatesrv.business;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceException;

import br.eti.ljr.sn.templatesrv.domain.Pessoa;
import br.eti.ljr.sn.templatesrv.exception.BssException;
import br.eti.ljr.sn.templatesrv.util.Funcoes;

@Stateless
public class PessoaBss extends Bss<Pessoa> {

	public static final byte COLABORADOR_STATUS_INATIVO = 0;
	public static final byte COLABORADOR_STATUS_ATIVO = 1;
	public static final byte COLABORADOR_STATUS_AFASTADO = 2;
	public static final byte COLABORADOR_STATUS_FERIAS = 3;
	public static final byte COLABORADOR_STATUS_ATESTADO = 4;

	public static final byte TIPO_LOGIN_LDAP = 2;
	public static final byte TIPO_LOGIN_SISTEMA = 1;

	public static final byte TIPO_DATA_NASCIMENTO = 1;
	public static final byte TIPO_DATA_NASC_DIA_MES = 1;

	private static final long serialVersionUID = 1L;

	public Pessoa getEntityByMatricula(Long matricula) {

		try {
			return dao.getEntityByCond("matricula = '" + matricula + "'");
		} catch (NonUniqueResultException e) {
			throw new BssException("Existem 2 pessoas com esta matrícula.\nContate o RH.");
		} catch (NoResultException e) {
			throw new BssException("Matrícula não encontrada no controle.\nContate o RH.");
		} catch (PersistenceException e) {
			throw new BssException("Banco inacessível.");
		}
	}

	public Pessoa getEntityCliente(Long codCliente) {

		return dao.getEntity(codCliente);
	}

	public void update(Pessoa entity) {

		verificaMatricula(entity);
		entity.setDataAtualizacao(new Date());
		preencherDataNascimento(entity);

		dao.merge(entity);
	}

	private void preencherDataNascimento(Pessoa entity) {

		if (entity.getTipoNascimento() == null) {
			entity.setDataNacimento(null);
			entity.setNascDia(null);
			entity.setNascMes(null);

		} else if (entity.getTipoNascimento() == 2) {
			entity.setDataNacimento(null);
		}

		if (entity.getDataNacimento() != null) {
			LocalDate date = Funcoes.dateToLocalDate(entity.getDataNacimento());
			entity.setTipoNascimento(TIPO_DATA_NASCIMENTO);
			entity.setNascDia((byte) date.getDayOfMonth());
			entity.setNascMes((byte) date.getMonthValue());
		}

	}

	private void verificaMatricula(Pessoa p) {

		if (p.getColaborador() != null && p.getColaborador()) {

			List<Pessoa> lista = dao
					.getListByCond("matricula=" + p.getMatricula() + " and codPessoa<>" + p.getCodPessoa());

			if (!lista.isEmpty()) {
				throw new BssException("Matrícula duplicada!");
			}
		}
	}
}
