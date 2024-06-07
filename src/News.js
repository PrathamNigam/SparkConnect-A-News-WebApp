import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {   
    static defaultProps = {
        country: 'in',
        pageSize: 8 ,
        category: 'general',
    }
    static propTypes= { 
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    
    constructor(){
        super();
        console.log("I am Constructor");
        this.state={
            articles: [],
            page:1,
            
        }
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9408cd8bc7ce4f51813019660636cf1e&page=1&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parseData= await data.json()
        console.log(parseData);
        this.setState({
            articles:parseData.articles,
            totalResults:parseData.totalResults
        })
    }
    handlePrevClick=async()=>{
        console.log("Previous")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9408cd8bc7ce4f51813019660636cf1e&page=${this.state.page-1}&${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parseData= await data.json()
        console.log(parseData);
        this.setState({
            page:this.state.page - 1,
            articles:parseData.articles,
            loading: false,
        })
    }
    handleNextClick=async ()=>{
        console.log("Next")
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/18))){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9408cd8bc7ce4f51813019660636cf1e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parseData= await data.json()
            console.log(parseData);
            this.setState({
                page:this.state.page + 1,
                articles:parseData.articles,
                loading: false,
            })
        }
    }  
  render() {
    
    return (
      <div className='container my-5'>
        <h1 className='text-center' style={{marginLeft:'22%', marginRight:'30%'}}>Top Headlines by SparkConnect</h1>
        {this.state.loading && <Spinner/>}
        <div className='row my-3'>
        {!this.state.loading && this.state.articles.map((elements)=>{ 
            return <div className='col-md-4'>
                    <NewsItem title={elements.title?elements.title.slice(0,45):" "} description={elements.description?elements.description.slice(0,100):" "}  sources={elements.source.name} imageUrl={elements.urlToImage?elements.urlToImage:"https://img.etimg.com/thumb/msid-102056124,width-1070,height-580,imgsize-41272,overlay-economictimes/photo.jpg"}  newsUrl={elements.url} author={elements.author} date={elements.publishedAt}  />
                   </div>
                  
        })}
        </div>
        <div className='container d-flex justify-content-between my-4'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/18)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
