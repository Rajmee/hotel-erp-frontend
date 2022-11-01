import { useEffect } from 'react';
import easyinvoice from 'easyinvoice';
// var fs = require('fs');
// import * as fs from 'browserify-fs'
// import * from 'browserify-fs';
import * as fs from 'fs';
// import { jsPDF } from "jspdf";
// import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

// const doc = new jsPDF();
var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    "images": {
        // The logo on top of your invoice
        "logo": "https://res.cloudinary.com/duvqwdyz6/image/upload/v1661764156/cover_wusqku.png",
        // The invoice background
        // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data
    "sender": {
        "company": "Supplier Co.In",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
        "company": "Managebeds",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": [
        {
            "quantity": 2,
            "description": "Product 1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": 4.1,
            "description": "Product 2",
            "tax-rate": 6,
            "price": 12.34
        },
        {
            "quantity": 4.5678,
            "description": "Product 3",
            "tax-rate": 21,
            "price": 6324.453456
        }
    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    "settings": {
        "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "gst", // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};


// const res = easyinvoice.createInvoice(data);
// fs.writeFileSync("invoice.pdf", res.pdf, 'base64');


const testPdf = () => {
	const func = async () => {

		return easyinvoice.createInvoice(data, function (result) {
			//The response will contain a base64 encoded PDF file
			console.log('PDF base64 string: ', result.pdf);
		});
		//await fs.writeFileSync("invoice.pdf", res.pdf, 'base64');
	}

	useEffect(async ()=>{
		// const res = func();
		// const res = await easyinvoice.createInvoice(data);
		// await fs.writeFileSync("invoice.pdf", res.pdf, 'base64');
		// const result = fs.readFileSync('example.txt', {encoding: 'utf-8'});
		// console.log(result);
		// fs.writeFileSync('/tmp/test-sync', 'Hey there!');
		// const result = fs.readFilesync('example.txt', {encoding: 'utf-8'});
		// console.log(result);
		//doc.setDrawColor(255,0,0);
		//doc.text("Supplier Invoice", 50, 10);

		//doc.line(30,15,70,15);
		// const supplierInfo = {
		// 	Name: "",
		// 	Address: "",
		// 	Mobile: "01789778845",
		// }
		// doc.text(supplierInfo, 30, 30)

		//doc.save("a4.pdf");

		easyinvoice.createInvoice(data, function (result) {
			easyinvoice.download('myInvoice.pdf', result.pdf);
			//	you can download like this as well:
			//	easyinvoice.download();
			//	easyinvoice.download('myInvoice.pdf');
		});


//or directly in browser


	},[]);

	const propsObject =
	{
		outputType: "save",
		returnJsPDFDocObject: true,
		fileName: "Invoice 2022",
		orientationLandscape: false,
		compress: true,
		logo: {
			src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
			width: 53.33, //aspect ratio = width/height
			height: 26.66,
			margin: {
				top: 0, //negative or positive num, from the current position
				left: 0 //negative or positive num, from the current position
			}
		},
		stamp: {
			inAllPages: true,
			src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
			width: 20, //aspect ratio = width/height
			height: 20,
			margin: {
				top: 0, //negative or positive num, from the current position
				left: 0 //negative or positive num, from the current position
			}
		},
		business: {
			name: "Business Name",
			address: "Albania, Tirane ish-Dogana, Durres 2001",
			phone: "(+355) 069 11 11 111",
			email: "email@example.com",
			email_1: "info@example.al",
			website: "www.example.al",
		},
		contact: {
			label: "Invoice issued for:",
			name: "Client Name",
			address: "Albania, Tirane, Astir",
			phone: "(+355) 069 22 22 222",
			email: "client@website.al",
			otherInfo: "www.website.al",
		},
		invoice: {
			label: "Invoice #: ",
			num: 19,
			invDate: "Payment Date: 01/01/2021 18:12",
			invGenDate: "Invoice Date: 02/02/2021 10:17",
			headerBorder: true,
			tableBodyBorder: true,
			header: [
			{
				title: "#", 
				style: { 
				width: 10 
				} 
			}, 
			{ 
				title: "Title",
				style: {
				width: 30
				} 
			}, 
			{ 
				title: "Description",
				style: {
				width: 80
				} 
			}, 
			{ title: "Price"},
			{ title: "Quantity"},
			{ title: "Unit"},
			{ title: "Total"}
			],
			table: Array.from(Array(15), (item, index)=>([
				index + 1,
				"There are many variations ",
				"Lorem Ipsum is simply dummy text dummy text ",
				200.5,
				4.5,
				"m2",
				400.5
			])),
		additionalRows: [{
				col1: 'Total:',
				col2: '145,250.50',
				col3: 'ALL',
				style: {
					fontSize: 14 //optional, default 12
				}
			},
			{
				col1: 'VAT:',
				col2: '20',
				col3: '%',
				style: {
					fontSize: 10 //optional, default 12
				}
			},
			{
				col1: 'SubTotal:',
				col2: '116,199.90',
				col3: 'ALL',
				style: {
					fontSize: 10 //optional, default 12
				}
			}],
			
			invDescLabel: "Invoice Note",
			invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
		},
		footer: {
			text: "The invoice is created on a computer and is valid without the signature and stamp.",
		},
		pageEnable: true,
		pageLabel: "Page ",
	}

  return (
	<div>testPdf</div>
  )
}

export default testPdf