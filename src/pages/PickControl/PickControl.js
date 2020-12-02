import React, { Component } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Form,
  FormField,
  Layer,
} from "grommet";
import { Tools, StatusCritical, FormClose } from "grommet-icons";
import './style.css';

class PickControl extends Component {
  constructor(props) {
    super(props);
    this.getProds = this.getProds.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clearLoading = this.clearLoading.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleResponseLayer = this.toggleResponseLayer.bind(this);
    this.sendMissing = this.sendMissing.bind(this)
    this.state = {
      value: "test",
      open: false,
      sqlFailed: false,
      sqlSuccess: false,
      currentAssy: 0,
      prods: []
    };
  }

  async getProds(event) {
    event.preventDefault();
    console.log(event.value.order);
    this.setState({ isLoading: true });
    this.setState({ value: event.value.order })

    let now = new Date();
    let url1 = "http://192.168.50.232:5000/packageScan";

    const postReq = new Request(url1 + '?id=' +  event.value.order + '&dateTime=' + now, {method: 'POST'});

    await fetch(postReq).then(async res => {
      console.log(res);
    })

    let url = "http://192.168.50.232:5000/products/" + event.value.order;

    const request = new Request(url, { method: "GET" });

    await fetch(request)
      // .then(res => res.json())
      .then(async res => {
        // console.log(res)
        return res.json();
      })
      .then(data => {
        for(var i in data){
          // console.log(data[i])
          var prod = data[i].ProductID
          if(prod.includes('-')){
            prod = prod.split('-')[0]
          }
          data[i].ParentProd = prod
          data[i].Image = 'http://192.168.50.232/imgs/' + data[i].ParentProd + '.png'
          data[i].Mono = {
            style: '',
            symbol: '',
            txt: ''
          };
          data[i].MClasses = []


          if(data[i].SpecialInstructions.length){
            var temp = data[i].SpecialInstructions.trim().split(/\[|\]|\r\n/);
            // console.log(temp);
            
            for(var j in temp){
              if(temp[j]!=''){
                if(temp[j].startsWith('Monogram')){
                  data[i].Mono.style = temp[j].split(":")[1];
                }
                else if(temp[j].startsWith('Symbol')){
                  data[i].Mono.symbol = temp[j].split(":")[1];
                }
                else if(temp[j].startsWith('Personalization')){
                  data[i].Mono.txt = temp[j].split(":")[1];
                }
                else{
                  data[i].Mono.weird = temp[j];
                }
              }
            }
            // console.log(data[i].Mono)
            
            
            if(data[i].Mono.weird){
              data[i].MClasses = []
            }
            else{
              if(data[i].Mono.style.toLowerCase().includes('traditional')){
                data[i].MClasses.push('trad')
              }
              else{
                if(data[i].Mono.symbol == 'None' || !data[i].Mono.symbol){
                  data[i].symbol = false
                }else{
                  if(data[i].Mono.symbol == 'JH Jon Hart Logo'){
                    data[i].MClasses.push('m_395');
                  }else if(data[i].Mono.symbol == 'Jon Hart Logo'){
                    data[i].MClasses.push('m_226');
                  }else if(data[i].Mono.symbol == 'Texas A&M University'){
                    data[i].MClasses.push('m_308');
                  }else if(data[i].Mono.symbol == 'Aggies'){
                    data[i].Mono.txt = 'Aggies';
                  }else if(data[i].Mono.symbol == 'Texas'){
                    data[i].MClasses.push('m_233');
                  }else if(data[i].Mono.symbol == 'Kappa Alpha Theta'){
                    data[i].MClasses.push('m_317');
                  }else{
                    var temp = data[i].Mono.symbol.toLowerCase(); 
                    if(temp == 'dolphin'){
                      data[i].MClasses.push('m_221');
                    }else if(temp == 'tool'){
                      data[i].MClasses.push('m_238');
                    }else if(temp == 'tool with shells'){
                      data[i].MClasses.push('m_239');
                    }else if(temp == 'arrow'){
                      data[i].MClasses.push('m_212');
                    }else if(temp == 'bumble bee'){
                      data[i].MClasses.push('m_214');
                    }else if(temp == 'butterfly'){
                      data[i].MClasses.push('m_215');
                    }else if(temp == 'cowboy boot'){
                      data[i].MClasses.push('m_216');
                    }else if(temp == 'cowboy hat'){
                      data[i].MClasses.push('m_217');
                    }else if(temp == 'cross'){
                      data[i].MClasses.push('m_218');
                    }else if(temp == 'crown'){
                      data[i].MClasses.push('m_219');
                    }else if(temp == 'fish'){
                      data[i].MClasses.push('m_222');
                    }else if(temp == 'fleur de lis'){
                      data[i].MClasses.push('m_223');
                    }else if(temp == 'heart'){
                      data[i].MClasses.push('m_224');
                    }else if(temp == 'infinity'){
                      data[i].MClasses.push('m_225');
                    }else if(temp == 'kite'){
                      data[i].MClasses.push('m_227');
                    }else if(temp == 'old key'){
                      data[i].MClasses.push('m_228');
                    }else if(temp == 'owl'){
                      data[i].MClasses.push('m_229');
                    }else if(temp == 'peace sign'){
                      data[i].MClasses.push('m_230');
                    }else if(temp == 'shamrock'){
                      data[i].MClasses.push('m_231');
                    }else if(temp == 'shell'){
                      data[i].MClasses.push('m_232');
                    }else if(temp == 'texas star'){
                      data[i].MClasses.push('m_234');
                    }else if(temp == 'texas christian university'){
                      data[i].MClasses.push('m_307');
                    }else if(temp == 'texas tech university'){
                      data[i].MClasses.push('m_309');
                    }else if(temp == 'baylor university'){
                      data[i].MClasses.push('m_310');
                    }else if(temp == 'alpha chi omega'){
                      data[i].MClasses.push('m_312');
                    }else if(temp == 'alpha delta pi'){
                      data[i].MClasses.push('m_313');
                    }else if(temp == 'chi omega'){
                      data[i].MClasses.push('m_314');
                    }else if(temp == 'deer head'){
                      data[i].MClasses.push('m_220');
                    }else if(temp == 'southern methodist university'){
                      data[i].MClasses.push('m_332');
                    }else if(temp == 'anchor'){
                      data[i].MClasses.push('m_213');
                    }else if(temp == 'delta delta delta'){
                      data[i].MClasses.push('m_315');
                    }else if(temp == 'delta gamma'){
                      data[i].MClasses.push('m_316');
                    }else if(temp == 'kappa delta'){
                      data[i].MClasses.push('m_318');
                    }else if(temp == 'kappa kappa gamma'){
                      data[i].MClasses.push('m_317');
                    }else if(temp == 'pi beta phi'){
                      data[i].MClasses.push('m_320');
                    }else if(temp == 'zeta tau alpha'){
                      data[i].MClasses.push('m_321');
                    }else if(temp == 'university of houston'){
                      data[i].MClasses.push('m_333');
                    }else if(temp == 'mississippi state university'){
                      data[i].MClasses.push('m_334');
                    }
                  }
                }
              }
              if(data[i].Mono.style.toLowerCase().includes('gold')){
                data[i].MClasses.push('gold')
              }else if(data[i].Mono.style.toLowerCase().includes('silver')){
                data[i].MClasses.push('silver')
              }else{
                data[i].MClasses.push('nat')
              }
            }
            // console.log(data[i])
          }
        }
        // console.log(data)
        
        // console.log(data.body);

        return data;
      }).then(data =>{
        // console.log(data)
        // console.log('205')
        if (data.length) {
          this.toggleResponseLayer(true);
          console.log("success1");
          // console.log(data)
          this.setState({prods: data}, this.resetForm())
        } else {
          this.toggleResponseLayer(false);
          console.log("No Results Found");
        }
      });
  }

  toggleResponseLayer(status) {
    if (status === true) {
      console.log("success2");
      this.setState(
        {
          open: true,
          sqlFailed: false,
          sqlSuccess: true
        },
        this.resetForm
      );
    } else {
      console.log("failed2");
      this.setState(
        {
          open: true,
          sqlFailed: true,
          sqlSuccess: false
        },
        this.resetForm
      );
    }
  }

  resetForm() {
    setTimeout(() => {
      // this.setState({ sqlFailed: false, sqlSuccess: false });
      document.getElementById("mainForm").reset();
      document.getElementById("mainFormInput").focus();
    }, 10);

    // setInterval() 
  }

  clearLoading() {
    this.setState({ isLoading: false });
    console.log("Clear Loading");
  }

  // onOpen() {
  //   this.setState({ open: true });
  // }

  onClose() {
    this.setState({ sqlFailed: false, sqlSuccess: false });
    document.getElementById("mainForm").reset();
    document.getElementById("mainFormInput").focus();
  }

  async sendMissing(prod){
    let now = new Date();
    let url2 = "http://localhost:5000/missingPic";

    const postReq1 = new Request(url2 + '?product=' +  prod + '&dateTime=' + now, {method: 'POST'});

    await fetch(postReq1).then(async res => {
      console.log(res);
    })
  }

  render() {
    return (
      <Box
        display="flex"
        direction="column"
        gap='xsmall'
      >
        <Heading
          style={{ textAlign: "center" }}
          size="small"
          level={1}
          alignSelf="center"
          margin='xsmall'
        >
          Jon Hart Products
        </Heading>
        <Form id="mainForm" onSubmit={this.getProds}>
          <FormField
            id="mainFormInput"
            name="order"
            label="Order Number:"
          />
          <Button icon={<Tools />} type="submit" primary label="Submit" />
        </Form>
        {this.state.sqlSuccess &&(
          <Box align='center'>
            <Text>Products for Order {this.state.value}:</Text>
            <Box direction='column' margin='small' pad='small' gap='none' elevation='small' overflow='scroll' style={{'overflowX': 'hidden'}}>
              {this.state.prods.map(prod => 
                <Box direction='row' align='center' elevation="small" style={{'minHeight': '350px'}} width='stretch' key={prod.LineNumber}>
                  <Box align='start' margin='small' width='medium' pad='small' >
                    <h2>{prod.ProductID}</h2>
                    <Text>{prod.Description}</Text>
                    <Text>Qty. Ordered: {prod.QtyOrdered}</Text>
                    <Text>Qty. Shipped: {prod.QtyShipped}</Text>
                    <hr/>
                    <Text><b>Qty. Remaining: {prod.QtyOrdered - prod.QtyShipped}</b></Text>
                  </Box>
                  <Box direction='column' align='center' margin='small' width='large' height='large' pad='small' background={{'size': 'contain', 'image': `url(${prod.Image})`}} style={{'maxHeight': '337px'}} onClick={(e) => {
                    // var clas = e.target.classList[1]
                    // var elem = document.getElementsByClassName(clas)
                    // console.log(elem)
                    var prod = e.target.previousSibling.childNodes[0].textContent;
                    console.log(prod);
                    
                    this.sendMissing(prod)

                  }}>
                  </Box>
                  <Box direction='column' align='end' width='medium' margin='small' pad='small'>
                    <Box direction='row' align='center'>
                      <Text>{prod.SpecialInstructions}</Text>
                    </Box>
                    <hr style={{'width': '100%'}}/>
                    <Box direction='row' align='center' height='small' width='medium'>
                      <div className='patch'>
                        <div className={'mono_text ' + prod.MClasses.join(' ')}>
                          {prod.MClasses.includes('trad') ? (<div key={prod.Mono.txt}><Text className='firstLast' size='27px'>{prod.Mono.txt[0]}</Text><Text className='mid' size='37px'>{prod.Mono.txt[1]}</Text><Text className='firstLast' size='27px'>{prod.Mono.txt[2]}</Text></div>) : [prod.Mono.txt && (<Text size='27px' key={prod.Mono.txt}>{prod.Mono.txt}</Text>)]
                          }
                        </div>
                      </div>
                    </Box>
                  </Box>
                </Box>
                )}
            </Box>
          </Box>
        )}
        {this.state.sqlFailed &&(
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={this.onClose}
            responsive={false}
            plain
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              justify="between"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              margin={{ top: "large" }}
              background="status-error"
            >
              <Box align="center" direction="row" gap="xsmall">
                <StatusCritical size={"36px"} />
                <Text>Could not find order {this.state.value}.  Please try again.  See log for details.</Text>
              </Box>
              <Button icon={<FormClose />} onClick={this.onClose} plain />
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default PickControl;
