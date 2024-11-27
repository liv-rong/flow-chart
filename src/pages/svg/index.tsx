const Svg = () => {
  return (
    <>
      <MermaidDiagram
        children={`
          %%{init: { "fontSize": "48px", "theme": "dark" ,"background":"red", "fontFamily": "monospace",} }%%
          graph TD
          A[asdas] --> B[Load Balancer]
          B --> C[Server01]
          B --> D[Server02]
          Still --> 'asd'
          'asd' --> Still
      `}
        onClick={(e) => {
          console.log(e, 'click')
        }}
      ></MermaidDiagram>
    </>
  )
}

export default Svg
