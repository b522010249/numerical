import React, {useState} from 'react'
import { Button, Col, Container, Form , Row, Table } from 'react-bootstrap'

import { create, all } from 'mathjs'
import { Line, LineChart, XAxis ,Tooltip, CartesianGrid, YAxis,ResponsiveContainer } from 'recharts'
const config = {}
const math = create(all, config)

const Bisection = () => {
    let scope = { x: 0 }

    const [eq, setfx] = useState({eq: ''})
    const [xl, setxl] = useState({xl: 0})
    const [xr, setxr] = useState({xr: 0})

    const [data, setdata] = useState(null)
    

    const Cal_Bisec = () =>{
        let l = Number(xl)
        let r = Number(xr)
        let er = 0.000001
        let i = 1
        let results=[]
        const Func = math.parse(eq)
        const Funccompile = Func.compile()

        const deta = {eq: eq,l: l,r: r};
        fetch("http://localhost:3001/record/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(deta),
          })
        
        do {
            let xm = (l+r)/2
            scope.x = r
            let fxr = Funccompile.evaluate(scope)
            scope.x = xm
            let fxm = Funccompile.evaluate(scope)

            if(Number(fxm) === 0.0 ){
                break
            }
            else if(fxm*fxr < 0){
                er=(xm - l)/xm;
                l=xm

            }else{
                er=(r - xm)/xm;
                r=xm
            }
            
            results.push({
                iteration: i,
                xl: l.toFixed(6),
                xr: r.toFixed(6),
                xm: xm.toFixed(6),
                fx: fxm.toFixed(6),
                er: er.toFixed(6)
            })
            i++
            

            
        } while (er >= 0.000001);
        
        setdata(results)





    }


    
  return (
    <div>
        <div class='mt-5 p-4 rounded bg-dark container text-white'>
            <Container>
                <Form >
                    <Form.Group>
                        <Form.Label column sm="2">f(x)</Form.Label>
                        <Form.Control onChange={ (e) => setfx(e.target.value) } required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">xl</Form.Label>
                        <Form.Control type='Number' onChange={ (e) => setxl(e.target.value)  } required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">xr</Form.Label>
                         <Form.Control type='Number' onChange={ (e) => setxr(e.target.value) } required/>                      
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Col>
                            <Button type="button" onClick={Cal_Bisec}>
                            Cal
                            </Button> 
                        </Col>                   
                    </Form.Group>                  
                </Form>
            </Container>
        </div>
        {data !== null && (
        <div class='mt-5 p-4 rounded bg-dark container text-white'>
            <Container>
                <Table class="table text-white table-dark  table-bordered ">
                    <thead class="text-white">
                        <tr>
                            <th>ITERATION</th>
                            <th>XL</th>
                            <th>XR</th>
                            <th>XM</th>
                            <th>FX</th>
                            <th>Error</th>                           
                        </tr>
                    </thead>
                    <tbody class="text-white">
                        {data.map((g)=>(
                            <tr key={g.iteration}>
                                <td>{g.iteration}</td>
                                <td>{g.xl}</td>
                                <td>{g.xr}</td>
                                <td>{g.xm}</td>
                                <td>{g.fx}</td>
                                <td>{g.er}</td>                                
                            </tr>
                        ))}                      

                    </tbody>
                </Table>
            </Container>
            <ResponsiveContainer  aspect={2}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="fx" stroke="#8884d8"  />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis  
                                dataKey={'xm'}  
                                name='stature'  
                                padding={{ left: 25, right: 20 }}
                            />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
        )}

    </div>
  )
}

export default Bisection