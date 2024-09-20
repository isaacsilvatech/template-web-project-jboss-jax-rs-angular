package br.eti.ljr.sn.templatesrv.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "LOJA")
public class Loja implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CODIGO")
	private Integer codigo;

	@Column(name = "APELIDO")
	private String apelido;

	@Column(name = "RAZAO_SOCIAL")
	private String razaoSocial;
	
	@Column(name = "END_LJ_LOGRADOURO")
	private String endLjLogradouro;
	
	@Column(name = "END_LJ_BAIRRO")
	private String endLjBairro;
	
	@Column(name = "CNPJ")
	private String cnpj;

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getApelido() {
		return apelido;
	}

	public void setApelido(String apelido) {
		this.apelido = apelido;
	}

	public String getRazaoSocial() {
		return this.razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getCnpj() {
		return this.cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getEndLjLogradouro() {
		return this.endLjLogradouro;
	}

	public void setEndLjLogradouro(String endLjLogradouro) {
		this.endLjLogradouro = endLjLogradouro;
	}
	
	public String getEndLjBairro() {
		return this.endLjBairro;
	}

	public void setEndLjBairro(String endLjBairro) {
		this.endLjBairro = endLjBairro;
	}

}