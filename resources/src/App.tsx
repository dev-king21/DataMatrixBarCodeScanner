import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box
} from '@material-ui/core';
import BarcodeScanner from './BarcodeScanner';
import { Result } from '@zxing/library'

// const verify_limit = 3;
const dummy_code = '#############';

export default function App() {

  const [scan, setScan] = useState<boolean>(false);
  const [code, setCode] = useState<string>(dummy_code);
  // const [codeVerified, setCodeVerified] = useState<number>(0);

  const scanCode = (err: unknown, result?: Result) => {
    if (result) {
      const captured_code = result.getText();
      // console.log(code, captured_code);
      // if (dummy_code !== captured_code) {
      //   console.log('verified cnt:', codeVerified);
      //   if (codeVerified + 1 === verify_limit)
      //     setScan(false);
      //   setCodeVerified((codeVerified + 1) % verify_limit);
      // }
      setCode(captured_code);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={3} >
        <Typography
          variant="h4"
          align='center'
          component="h1"
          color="secondary"
          gutterBottom
        >
          Data Matrix Scanner
        </Typography>

        <Box my={2}>
          {
            scan ?
              (
                <div style={{ textAlign: 'center' }}>
                  <BarcodeScanner
                    width={'90%'}
                    height={'auto'}
                    onUpdate={scanCode}
                  />
                </div>
              ) :
              (
                <div style={{ textAlign: 'center' }}>
                  <img
                    className="img-fluid"
                    width="360px"
                    height="360px"
                    src="https://chart.googleapis.com/chart?cht=qr&chs=512x512&choe=ISO-8859-1&chl=%d1%50%01%00%00%00%f6%5f%05%2d%8f%0b%40%e2%01" />
                </div>
              )
          }
        </Box>
        <Box my={2} style={{ textAlign: 'center' }}>
          <TextField
            label="QR Code"
            value={code}
            variant="outlined"
            error
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <div style={{ textAlign: 'center' }}>
          <Button
            className="my-4"
            variant="contained"
            color="secondary"
            onClick={() => setScan(true)}
          >
            {scan ? "Scanning ..." : "Start Scan"}
          </Button>
        </div>

      </Box>
    </Container >
  );
}
