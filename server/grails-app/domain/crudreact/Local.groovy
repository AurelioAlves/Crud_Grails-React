package crudreact

import grails.rest.Resource

@Resource(uri = "/local")
class Local {
    String nome
    Integer capacidade

    static constraints = {
        nome unique: true
        capacidade nullabel:false, blank:false
    }
}

