package crudreact

import grails.rest.Resource

@Resource(uri = "/banda")
class Banda{
    String nome
    String genero

    static hasMany = [show: Shows]
    static belongsTo = [Shows]

    static constraints = {
        nome nullable: false, blank:false, unique: true
        genero inList:["Rock","Forro","Axe"]
    }
}
