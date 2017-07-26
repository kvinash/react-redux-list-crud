import React, {Component} from 'react';
import Comment from '../component/comment';

//comment object
const commentObj = {
	img: '64.jpg',
	date: new Date(),
	author: {
		name: 'Kapil',
		comment: 'Full Stack Dev',
		company: 'Ranosys'
	}
};

class AboutMe extends Comment {
	render() {
		return (
			<Comment img={commentObj.img} date={commentObj.date} author={commentObj.author} />
		);
	}
}

export default AboutMe;