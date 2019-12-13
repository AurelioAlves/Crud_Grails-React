package crudreact

import grails.rest.Resource


class Shows {
    Date dataDoShow = new Date()
    Local local

    static hasMany = [bandas: Banda]

    static constraints = {
        dataDoShow nullable: false, blank:false, unique: true
        local nullable: false, blank:false

    }
}
