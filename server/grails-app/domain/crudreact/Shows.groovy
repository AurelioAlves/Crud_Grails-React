package crudreact

import grails.rest.Resource

@Resource(uri = "/show")
class Shows {
    Date dataDoShow
    Local local

    static hasMany = [bandas: Banda]

    static constraints = {
        dataDoShow nullable: false, blank:false, unique: true
        local nullable: false, blank:false
    }
}
