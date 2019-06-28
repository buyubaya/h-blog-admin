import React, { Component } from 'react';
import map from 'lodash/map';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
	componentDidMount() {
		this.props.fetchBlogs();
	}

	handleDelete = async (id) => {
		const res = await axios.delete(`/api/blogs/${id}`);
	}

	renderBlogs() {
		return map(this.props.blogs, blog => {
			return (
				<div className="card darken-1 horizontal" key={blog._id}>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-title">{blog.title}</span>
							<p>{blog.content}</p>
						</div>
						<div className="card-action">
							<a className='btn-flat red white-text' href='javascript:;' onClick={() => this.handleDelete(blog._id)}>Delete</a>
						</div>
						<div className="card-action">
							<Link to={`/blogs/${blog._id}`}>Read</Link>
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderBlogs()}</div>;
	}
}

function mapStateToProps({ blogs }) {
	return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
