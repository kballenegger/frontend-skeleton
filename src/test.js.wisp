;; implementation

;;(def converter (new Showdown.converter))
;(def converter {:makeHtml (fn [x] x)})
;(defn md->html
  ;"convert markdown to html using showdown"
  ;[md]
  ;(converter.makeHtml md)
  ;)

;(def-react-class Comment
  ;(render []
          ;(dom div {:className :author}
               ;this.props.name)
          ;(dom div {:className :text}
               ;(md->html this.props.text)
               ;)
          ;)
  ;(name :hello)
  ;(somevector [])
  ;)

;(def-react-class CommentList
  ;(render []
          ;(dom div {}
               ;(Comment)
               ;(Comment {:name "second", :body "#onetwo\nthree"})
               ;(Comment {:name "third"})
               ;)
          ;)
  ;)

;(def-react-class CommentBox
  ;(render []
          ;(dom div {:className :commentBox}
               ;"Comments!"
               ;(CommentList {:name "World"})
               ;)
          ;)
  ;)

;(def-react-class HelloWorld
  ;(render []
          ;(dom div {} "Hello world!")
          ;))


;(console.log (document.getElementById "app"))
;(React.renderComponent
  ;(HelloWorld {})
  ;(document.getElementById "app"))

(React.renderComponent
  (dom div {:id "one" :class "two"}
       (dom span {:style {:color :red, :font-weight :bold}} "HELLO ")
       (dom span {:style {:color :blue}} "WORLD ")
       "ola"
       )

  (document.getElementById "app"))
