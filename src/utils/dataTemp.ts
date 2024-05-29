import type { IHeaderCustomTable } from "@/models/customComponents.model";


interface responseTabla {
    data: any;
    columns: IHeaderCustomTable[];
    meta: {
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
}
export const responseTableExample = (api: string) => {
    return new Promise<responseTabla>((resolve) => {


        setTimeout(() => {
            resolve({
                "data": [
                    {
                        "CONDUCTOR_ID": "23",
                        "CONDUCTOR_IDENTIFICACION": "1233492669",
                        "CONDUCTOR_CODCONDUCTOR": "12345",
                        "CONDUCTOR_PRIMERNOMBRE": "DANIEL",
                        "CONDUCTOR_SEGUNDONOMBRE": "ALFONSO",
                        "CONDUCTOR_PRIMERAPELLIDO": "GALLEGO",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "PEÑA",
                        "CONDUCTOR_TELPERSONAL": "3002534104",
                        "CONDUCTOR_TELCORPORATIVO": "3227848121",
                        "CONDUCTOR_CORREO": "OBERON@THOMASGREG.COM",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": null,
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "24",
                        "CONDUCTOR_IDENTIFICACION": "1030684547",
                        "CONDUCTOR_CODCONDUCTOR": "13001",
                        "CONDUCTOR_PRIMERNOMBRE": "JUAN",
                        "CONDUCTOR_SEGUNDONOMBRE": "SEBASTIAN",
                        "CONDUCTOR_PRIMERAPELLIDO": "FUQUENE",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "TORRES",
                        "CONDUCTOR_TELPERSONAL": "3125182390",
                        "CONDUCTOR_TELCORPORATIVO": "3125182390",
                        "CONDUCTOR_CORREO": "OBERON@THJOMASGREG.COM",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": null,
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "25",
                        "CONDUCTOR_IDENTIFICACION": "1031163375",
                        "CONDUCTOR_CODCONDUCTOR": "123456",
                        "CONDUCTOR_PRIMERNOMBRE": "JHON",
                        "CONDUCTOR_SEGUNDONOMBRE": "JAIRO",
                        "CONDUCTOR_PRIMERAPELLIDO": "BENITEZ",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "NIÑO",
                        "CONDUCTOR_TELPERSONAL": "3133270688",
                        "CONDUCTOR_TELCORPORATIVO": "3133270688",
                        "CONDUCTOR_CORREO": "JHON.BENITEZ@THOMASGREG.COM",
                        "CONDUCTOR_ESTADO": "1",
                        "CONDUCTOR_FECINGRESO": "2021-07-01T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "26",
                        "CONDUCTOR_IDENTIFICACION": "1",
                        "CONDUCTOR_CODCONDUCTOR": "13002",
                        "CONDUCTOR_PRIMERNOMBRE": "DANIEL",
                        "CONDUCTOR_SEGUNDONOMBRE": "FERNANDO",
                        "CONDUCTOR_PRIMERAPELLIDO": "ROA ",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "AVILA",
                        "CONDUCTOR_TELPERSONAL": "3144759190",
                        "CONDUCTOR_TELCORPORATIVO": "3144759190",
                        "CONDUCTOR_CORREO": "DANIEL.ROA@THOMASGREG.COM",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": null,
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "27",
                        "CONDUCTOR_IDENTIFICACION": "80196103",
                        "CONDUCTOR_CODCONDUCTOR": "13003",
                        "CONDUCTOR_PRIMERNOMBRE": "CARLOS",
                        "CONDUCTOR_SEGUNDONOMBRE": "GUSTAVO",
                        "CONDUCTOR_PRIMERAPELLIDO": "SANCHEZ",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "RANGEL",
                        "CONDUCTOR_TELPERSONAL": "3167372861",
                        "CONDUCTOR_TELCORPORATIVO": null,
                        "CONDUCTOR_CORREO": "diseno.grafico@thomasgreg.com",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": "2021-08-05T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "A +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "46",
                        "CONDUCTOR_IDENTIFICACION": "2",
                        "CONDUCTOR_CODCONDUCTOR": "13004",
                        "CONDUCTOR_PRIMERNOMBRE": "FELIPE",
                        "CONDUCTOR_SEGUNDONOMBRE": "ANDRES",
                        "CONDUCTOR_PRIMERAPELLIDO": "CARDENAS",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "ZAPATA",
                        "CONDUCTOR_TELPERSONAL": "3112222222",
                        "CONDUCTOR_TELCORPORATIVO": "3112222222",
                        "CONDUCTOR_CORREO": "felipe@hotmail.com",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": "2021-08-05T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "A +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "47",
                        "CONDUCTOR_IDENTIFICACION": "80903836",
                        "CONDUCTOR_CODCONDUCTOR": "80903836",
                        "CONDUCTOR_PRIMERNOMBRE": "CARLOS",
                        "CONDUCTOR_SEGUNDONOMBRE": null,
                        "CONDUCTOR_PRIMERAPELLIDO": "GÓMEZ",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "GÓMEZ",
                        "CONDUCTOR_TELPERSONAL": "3333333",
                        "CONDUCTOR_TELCORPORATIVO": "2333333",
                        "CONDUCTOR_CORREO": "2121",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": "2021-07-01T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "51",
                        "CONDUCTOR_IDENTIFICACION": "1023006929",
                        "CONDUCTOR_CODCONDUCTOR": "9999999",
                        "CONDUCTOR_PRIMERNOMBRE": "NICOLAS",
                        "CONDUCTOR_SEGUNDONOMBRE": null,
                        "CONDUCTOR_PRIMERAPELLIDO": "GARCIA",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "RAMIREZ",
                        "CONDUCTOR_TELPERSONAL": "0",
                        "CONDUCTOR_TELCORPORATIVO": "3102141595",
                        "CONDUCTOR_CORREO": "0",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": "2021-08-17T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "52",
                        "CONDUCTOR_IDENTIFICACION": "1016102403",
                        "CONDUCTOR_CODCONDUCTOR": "13005",
                        "CONDUCTOR_PRIMERNOMBRE": "THOMAS",
                        "CONDUCTOR_SEGUNDONOMBRE": "FELIPE",
                        "CONDUCTOR_PRIMERAPELLIDO": "RODRIGUEZ",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "GONZALEZ",
                        "CONDUCTOR_TELPERSONAL": "3134411834",
                        "CONDUCTOR_TELCORPORATIVO": "0",
                        "CONDUCTOR_CORREO": "oberon@thomasgreg.com",
                        "CONDUCTOR_ESTADO": "0",
                        "CONDUCTOR_FECINGRESO": "2021-08-19T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    },
                    {
                        "CONDUCTOR_ID": "53",
                        "CONDUCTOR_IDENTIFICACION": "1070305056",
                        "CONDUCTOR_CODCONDUCTOR": "105151",
                        "CONDUCTOR_PRIMERNOMBRE": "VICTOR",
                        "CONDUCTOR_SEGUNDONOMBRE": "ALFONSO",
                        "CONDUCTOR_PRIMERAPELLIDO": "BUSTOS",
                        "CONDUCTOR_SEGUNDOAPELLIDO": "CONTRERAS",
                        "CONDUCTOR_TELPERSONAL": "0",
                        "CONDUCTOR_TELCORPORATIVO": "0",
                        "CONDUCTOR_CORREO": "0",
                        "CONDUCTOR_ESTADO": "1",
                        "CONDUCTOR_FECINGRESO": "2021-08-27T00:00:00.000Z",
                        "typeIdentification": {
                            "TIP_IDEN_DESCRIPCION": "CEDULA DE CUIDADANIA"
                        },
                        "factorRh": {
                            "FACTOR_RH_DESCRIPCION": "O +"
                        }
                    }
                ],
                "columns": [
                    {
                        "type": "button",
                        "name": "Detalle",
                        "props": {
                            "options": {
                                "color": "success",
                                "size": "lg",
                                loader: true,
                            },
                            "disabled": false,
                            "children": "Foto del conductor"
                        }
                    },
                    {
                        "type": "cell",
                        "name": "Tipo de Documento",
                        "selector": "typeIdentification.TIP_IDEN_DESCRIPCION",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "Documento",
                        "selector": "CONDUCTOR_IDENTIFICACION",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "Código",
                        "selector": "CONDUCTOR_CODCONDUCTOR",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "Nombre",
                        "selector": "CONDUCTOR_PRIMERNOMBRE",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "RH",
                        "selector": "factorRh.FACTOR_RH_DESCRIPCION",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "Teléfono Personal",
                        "selector": "CONDUCTOR_TELPERSONAL",
                        "sortable": true
                    },
                    {
                        "type": "cell",
                        "name": "Teléfono Corporativo",
                        "selector": "CONDUCTOR_TELCORPORATIVO",
                        "sortable": true
                    }
                ],
                "meta": {
                    "page": 1,
                    "take": 10,
                    "itemCount": 401,
                    "pageCount": 41,
                    "hasPreviousPage": false,
                    "hasNextPage": true
                }
            });
        }, 2000);
    });
}