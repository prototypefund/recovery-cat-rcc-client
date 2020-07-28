export class RccQrCodeScanner {
	
	public async scan(): Promise<any> {
		return Promise.reject('RccQrCodeScanner: missing QR Code scanning service, please provide a service at QrCodeModule.')
	}

}

