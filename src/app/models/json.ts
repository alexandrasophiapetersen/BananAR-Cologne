export interface Daten{
  id: any;
  qrcode: string;
  location: {
    latitude: any;
    longitude: any;
    street: string;
  };
  title: string;
  artist: {
    name: string;
    website: string;
  };
  information: {
    text: string;
    gallery: {
      picturemap: string;
      picturemapcredit: string;
    };
  };
}
