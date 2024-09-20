package br.eti.ljr.sn.templatesrv.filter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.module.SimpleModule;

import br.eti.ljr.sn.templatesrv.util.DateParser;

@Provider
public class JsonFilter extends JacksonJsonProvider {

	public JsonFilter() {

		ObjectMapper objectMapper = locateMapper(ObjectMapper.class, MediaType.APPLICATION_JSON_TYPE);
		objectMapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
		objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		SimpleModule module = new SimpleModule("DateModule", Version.unknownVersion());
		module.addDeserializer(Date.class, new DateDeserializer());
		module.addSerializer(Date.class, new DateSerializer());

		objectMapper.registerModule(module);
	}

	private class DateSerializer extends JsonSerializer<Date> {

		private final SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");

		@Override
		public void serialize(Date date, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
			String formattedDate = outputFormat.format(date);
			jsonGenerator.writeString(formattedDate);
		}
	}

	private class DateDeserializer extends JsonDeserializer<Date> {

		@Override
		public Date deserialize(JsonParser jsonParser, DeserializationContext context) throws IOException {
			String dateStr = jsonParser.getText();
			return DateParser.parse(dateStr);
		}
	}
}