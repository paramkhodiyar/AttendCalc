
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensionslist = [StarterKit]

const content = ``
const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  })
  if (!editor) {
    return null
  }
  return (
    <>
      {/* <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      <div>
        <button onClick={()=> editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold')? "is-active" : ""}>Bold</button>
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default Tiptap