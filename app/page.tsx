"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Plus, Code, Palette, Zap } from "lucide-react"

export default function LiveCodeEditor() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Welcome to my website</p>
    <button onclick="changeColor()">Click me!</button>
</body>
</html>`)

  const [cssCode, setCssCode] = useState(`body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 50px;
    margin: 0;
}

h1 {
    font-size: 3em;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #ff5252;
    transform: scale(1.05);
}`)

  const [jsCode, setJsCode] = useState(`function changeColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
    
    // Add some animation
    document.body.style.transition = 'background 0.5s ease';
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
});`)

  const [output, setOutput] = useState("")
  const [activeTab, setActiveTab] = useState("html")

  const runCode = () => {
    const combinedCode = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode.replace(/<html[^>]*>|<\/html>|<head[^>]*>|<\/head>|<body[^>]*>|<\/body>/gi, "")}
          <script>${jsCode}</script>
        </body>
      </html>
    `
    setOutput(combinedCode)
  }

  const addNewFile = () => {
    alert("Add new file feature - Coming soon!")
  }

  const clearCode = () => {
    if (activeTab === "html") {
      setHtmlCode("")
    } else if (activeTab === "css") {
      setCssCode("")
    } else if (activeTab === "js") {
      setJsCode("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-400">Live Code Editor</h1>
          <div className="flex gap-2">
            <Button
              onClick={addNewFile}
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 border-green-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
            <Button onClick={runCode} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Code Editor Section */}
        <div className="w-1/2 border-r border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="w-full bg-gray-800 rounded-none border-b border-gray-700">
              <TabsTrigger value="html" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                JavaScript
              </TabsTrigger>
            </TabsList>

            <TabsContent value="html" className="h-[calc(100%-48px)] m-0">
              <div className="h-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">HTML Code</span>
                  <Button onClick={clearCode} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    Clear
                  </Button>
                </div>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-[calc(100%-40px)] bg-gray-800 text-white p-4 rounded border border-gray-600 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Enter your HTML code here..."
                />
              </div>
            </TabsContent>

            <TabsContent value="css" className="h-[calc(100%-48px)] m-0">
              <div className="h-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">CSS Code</span>
                  <Button onClick={clearCode} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    Clear
                  </Button>
                </div>
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-[calc(100%-40px)] bg-gray-800 text-white p-4 rounded border border-gray-600 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Enter your CSS code here..."
                />
              </div>
            </TabsContent>

            <TabsContent value="js" className="h-[calc(100%-48px)] m-0">
              <div className="h-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">JavaScript Code</span>
                  <Button onClick={clearCode} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    Clear
                  </Button>
                </div>
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className="w-full h-[calc(100%-40px)] bg-gray-800 text-white p-4 rounded border border-gray-600 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Enter your JavaScript code here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Output Section */}
        <div className="w-1/2 bg-white">
          <div className="bg-gray-800 p-3 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Output</h3>
          </div>
          <div className="h-[calc(100%-60px)]">
            {output ? (
              <iframe
                srcDoc={output}
                className="w-full h-full border-none"
                title="Code Output"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Click "Run" to see your code in action!</p>
                  <p className="text-sm mt-2">Write your HTML, CSS, and JavaScript code, then hit the Run button.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
