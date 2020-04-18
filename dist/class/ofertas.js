var Ofertas = /** @class */ (function () {
    function Ofertas() {
        this.ofertas = [];
        this.ofertas = [];
    }
    Ofertas.prototype.agregarOferta = function (link, type, sdp) {
        var oferta = {
            link: link,
            type: type,
            sdp: sdp
        };
        this.ofertas.push(oferta);
        return this.ofertas;
    };
    Ofertas.prototype.getOferta = function (link) {
        var oferta = this.ofertas.filter(function (oferta) {
            return oferta.link === link;
        })[0];
        return oferta;
    };
    Ofertas.prototype.eliminarOferta = function (link) {
        this.ofertas = this.ofertas.filter(function (oferta) {
            return oferta.link != link;
        });
        return this.ofertas;
    };
    Ofertas.prototype.getOfertas = function () {
        return this.ofertas;
    };
    return Ofertas;
}());
module.exports = {
    Ofertas: Ofertas
};
//# sourceMappingURL=ofertas.js.map