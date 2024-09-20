package br.eti.ljr.sn.templatesrv.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DateParser {

	private static final List<SimpleDateFormat> DATE_FORMATS = new ArrayList<>();

	static {
		DATE_FORMATS.add(new SimpleDateFormat("dd/MM/yyyy"));
		DATE_FORMATS.add(new SimpleDateFormat("yyyy-MM-dd"));
		DATE_FORMATS.add(new SimpleDateFormat("MM-dd-yyyy"));
		DATE_FORMATS.add(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
		DATE_FORMATS.add(new SimpleDateFormat("E MMM dd yyyy HH:mm:ss zzz"));
	}

	public static Date parse(String dateStr) {
		for (SimpleDateFormat dateFormat : DATE_FORMATS) {
			try {
				return dateFormat.parse(dateStr);
			} catch (ParseException e) {
			}
		}
		throw new RuntimeException("Cannot parse date: " + dateStr);
	}

}
