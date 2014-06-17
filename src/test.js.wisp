;; implementation
(set! empty-hash {})

;;(def converter (new Showdown.converter))
(def converter {:makeHtml (fn [x] (+ x " - BLAH"))})
(defn md->html
  "convert markdown to html using showdown"
  [md]
  (converter.makeHtml md)
  )

(def-react-class Comment
  (render []
          (dom div {:className :comment}
               (dom div {:className :author}
                    this.props.author)
               (dom div {:className :text}
                    (md->html this.props.text)
                    )
               ))
  (name :hello) ; just to test the macro
  (somevector []) ; just to test the macro
  )

(def-react-class CommentInput
  (submit []
          (let [author-dom (.getDOMNode this.refs.author)
                author (.trim (:value author-dom))
                text-dom (.getDOMNode this.refs.text)
                text (.trim (:value text-dom))
                ]
            (if (and text author)
              (let []
                (set! (aget author-dom :value) "")
                (set! (aget text-dom :value) "")
                (this.props.callback {:author author, :text text})
                ))
            false)
          )
  (render []
          (dom form {:className :comment-form, :onSubmit this.submit}
               (dom input {:type "text", :placeholder "Name", :ref :author})
               (dom input {:type "text", :placeholder "Say something...", :ref :text})
               (dom input {:type "submit", :value "Post"})
               )
          ))

(def-react-class CommentList
  (render []
          (dom div {}
               (.map this.props.data #(Comment %))
               )
          )
  )

(def test-data )

(def-react-class CommentBox
  (comments-updated [comment]
                    (this.setState {:data (.concat this.state.data comment)})
                    (console.log this.state)
                    )
  (getInitialState []
                   {:data [{:author "Brandon Goldman", :text "I am Brandon!"}
                           {:author "George Burke", :text "I am George!"}
                           {:author "Kenneth Ballenegger", :text "I am Kenneth!"}
                           ]})
  (render []
          (dom div {:className :comment-box}
               (dom h1 empty-hash "Comments:") ; NOTE: hack around stupid compiler crasher bug
               (CommentList {:data this.state.data})
               (CommentInput {:callback (:comments-updated this)})
               )
          )
  )

(React.renderComponent
  (CommentBox)
  (document.getElementById "app"))
