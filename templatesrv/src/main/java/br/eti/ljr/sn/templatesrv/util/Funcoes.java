package br.eti.ljr.sn.templatesrv.util;

import java.lang.management.ManagementFactory;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

import br.eti.ljr.sn.templatesrv.exception.BssException;

public class Funcoes {

	private static DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
	private static DateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
	private static DateFormat dateFormatTmz = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	private static DateFormat dateFormatDh = new SimpleDateFormat("dd/MM/yyyy HH:mm");

	static {
		dateFormat.setLenient(false);
		dateFormatTmz.setLenient(false);
		dateFormatDh.setLenient(false);
		dateFormat2.setLenient(false);
	}

	public static String getHash(String senha) {

		String sen = "";
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		BigInteger hash = new BigInteger(1, md.digest(senha.getBytes()));
		sen = hash.toString(16);
		return sen;
	}

	public static String colocaZero(String tx, int tam) {

		StringBuffer sb = new StringBuffer();
		int falta = tam - tx.length();
		for (int i = 0; i < falta; i++) {
			sb.append("0");
		}
		sb.append(tx);

		return sb.toString();
	}

	public static String dateParaSring(Date data) {
		try {
			return dateFormat.format(data);
		} catch (NullPointerException e) {
			return null;
		}
	}

	public static String dateParaSring2(Date data) {
		try {
			return dateFormat2.format(data);
		} catch (NullPointerException e) {
			return null;
		}
	}

	public static String dateParaSringDh(Date data) {
		try {
			return dateFormatDh.format(data);
		} catch (NullPointerException e) {
			return null;
		}
	}

	public static Date stringParaDate(String data) {
		try {
			return dateFormat.parse(data);
		} catch (ParseException e) {
			return null;
		}
	}

	public static Date stringParaDateTmz(String data) {
		try {
			return dateFormatTmz.parse(data);
		} catch (ParseException e) {
			return null;
		}
	}

	public static LocalDate dateToLocalDate(Date input) {

		Calendar cal = Calendar.getInstance();
		cal.setTime(input);
		LocalDate date = LocalDate.of(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1,
				cal.get(Calendar.DAY_OF_MONTH));

		return date;
	}

	public static String colocaZero(int tx, int tam) {

		return colocaZero(Integer.toString(tx), tam);
	}

	public static Date getDateTime(int hora, int min) {

		Calendar cal = Calendar.getInstance();
		cal.setTime(getDateTime());
		cal.set(Calendar.HOUR_OF_DAY, hora);
		cal.set(Calendar.MINUTE, min);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date getDateTime() {
		return new Date();
	}

	public static boolean isServerPrincipal(String valor) throws BssException {
		try {
			InetAddress inetAddress = InetAddress.getLocalHost();

			if (valor.equals(inetAddress.getHostName()) || isDebugging()) {
				return true;
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (BssException e) {
			e.printStackTrace();
			throw new BssException("Nao foi possivel determinar se o servidor e principal");
		}
		return false;
	}

	public static boolean isDebugging() {
		return ManagementFactory.getRuntimeMXBean().getInputArguments().toString().contains("-agentlib:jdwp");
	}
}
