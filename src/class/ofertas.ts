

class Ofertas{

    ofertas: Oferta[] = [];

    constructor(){
        this.ofertas = [];
    }

    agregarOferta(link: string, type: string, sdp: string): Object[] {
        let oferta: Oferta = {
            link,
            type,
            sdp
        }
        this.ofertas.push(oferta);
        return this.ofertas;
    }

    getOferta(link: string): Object {
        var oferta = this.ofertas.filter( (oferta: Oferta) => {
            return oferta.link === link;
        })[0];
        return oferta;
    }

    eliminarOferta(link: string): Object[] {
        this.ofertas = this.ofertas.filter( (oferta: Oferta) => {
            return oferta.link != link;
        });
        return this.ofertas;
    }

    getOfertas(){
        return this.ofertas;
    }
}

interface Oferta{
    link: string;
    type: string;
    sdp: string;
}

module.exports = {
    Ofertas
}
