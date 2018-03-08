require("dotenv").config({ path: "./.env.local" });
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
process.env.PORT = process.env.TEST_PORT || require("../../utils/consts").defaultTestPort;
process.env.NODE_ENV = require("../../utils/consts").testEnv;
const ROUTE_PREFIX = "pokemons";

describe("pokemons routes", () => {
    let server = null;
    beforeAll(() => {
        server = require("../../bin/www");
    });

    it("should get and return an array", done => {
        chai.request(server)
            .get(`${ROUTE_PREFIX}/`)
            .end((err, res) => {
                console.log(res);
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body).toEqual({ pokemons: [] });
                done();
            });
    });

    it("should post and create a pokemon", done => {
        chai.request(server)
            .post(`/${ROUTE_PREFIX}`)
            .send({
                "name": "dydy",
                "description": "Le plus crade de tous les pokemon",
                "id_parent": 0,
                "image": "prout",
                "id_national": 1000,
                "type1": 0,
                "type2": 0,
            })
            .end((err, res) => {
                expect(res.name).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body.name).toEqual("dydy");
                done();
            });
    });
    it("should throw 404", done => {
        chai.request(server)
            .get(`/${ROUTE_PREFIX}/uhoh`)
            .end((err, res) => {
                expect(err).not.toBeNull();
                expect(res.status).toBe(404);
                expect(res.ok).toBe(false);
                done();
            });
    });



    afterAll(async () => {
        await server.close();
    });
});
