package crudreact


import grails.rest.*
import grails.converters.*

import java.text.SimpleDateFormat


class ShowsController {
    static responseFormats = ['json']

    def index() {
        def shows = Shows.list()
        respond shows
    }

    def salvar() {
        def retorno = [:]
        def teste2 = request.JSON
        def show = new Shows()
        def data = "yyyy-MM-dd"
        def input = teste2.dataDoShow
        try {
            Local local = Local.get(teste2.localId)
            show.dataDoShow = new SimpleDateFormat(data).parse(input)
            show.local = local
        }catch(Exception ex) {
            retorno["mensagem"] = "ERROR"
        }
        show.validate()
        if(!show.hasErrors()){
            show.save(flush:true)
            retorno["mensagem"] = "OK"
        }else{
            retorno["mensagem"] = "ERROR"
        }

        render retorno as JSON
    }

    def delete(){
        def retorno = [:]
        Shows show = Shows.get(params.id)
        try{
            show.delete(flush: true)
            retorno["mensagem"] = "OK"
        } catch(Exception ex){
            retorno["mensagem"]= "ERROR"
        }

        render retorno as JSON
    }

    def vincular(){
        def retorno = [:]
        def data = request.JSON
        Shows shows = Shows.get(data.ShowsId)
        Banda banda = Banda.get(data.BandaId)

        try{
            banda.addToShow(shows)
            retorno["mensagem"] = "OK"
            banda.validate()
            if(!banda.hasErrors()){
                banda.save(flush:true)
            }
        }catch(Exception ex){
            retorno["mensagem"] = "ERROR"
        }

        render retorno as JSON
    }

    def desvincular(){
        def retorno = [:]
        def data = request.JSON
        Shows shows = Shows.get(data.ShowsId)
        Banda banda = Banda.get(data.BandaId)

        try{
            banda.removeFromShow(shows)
            retorno["mensagem"] = "OK"
            banda.validate()
            if(!banda.hasErrors()){
                banda.save(flush:true)
            }
        }catch(Exception ex){
            retorno["mensagem"] = "ERROR"
        }

        render retorno as JSON
    }


}
