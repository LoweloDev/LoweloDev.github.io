package com.studenthub.logic;

import com.studenthub.models.EncodedBlob;
import com.studenthub.data.consts.Encodings;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import java.io.UnsupportedEncodingException;

@Service
public class DecodeService {

    byte[] decodeBlob(EncodedBlob encodedBlob) throws UnsupportedEncodingException {
            Encodings blobEncoding = Encodings.get(encodedBlob.getEncodingString());
            if (blobEncoding == null) throw new UnsupportedEncodingException();

            if (blobEncoding == Encodings.BASE_64) {
                String string = encodedBlob.getData().replaceAll("\n", "");
//                    System.out.println(Base64Utils.encodeToString(Base64Utils.decodeFromString(string)).equals(blob.getData().replaceAll("\n", "")));
                return Base64Utils.decodeFromString(string);
            }

        return null;
    }
}
