package crudreact

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"salvar")
        post "/$controller/"(action: "salvar")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")


        "/"(controller: 'application', action:'index')
        "/shows/vincular"(controller:'shows', action:'vincular', method:'post')
        "/shows/desvincular"(controller:'shows', action:'desvincular', method:'post')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
