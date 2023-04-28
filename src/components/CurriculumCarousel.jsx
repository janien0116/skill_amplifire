import React, { useState } from 'react'
import { Carousel, Container } from 'react-bootstrap'
import { backEnd, bookKeeping, contentCreate, dataAnalyst, frontEnd, gameDev, graphicDesign, machineLearning, manageDB, responsiveWeb, socialMarket, webDesign } from '../assets'

const CurriculumCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div>
            <Container className='d-flex justify-content-center'>
                <Carousel activeIndex={index} onSelect={handleSelect} className='curriculum mb-5'>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={frontEnd}
                            alt="Front End Web Dev"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Front End Web Development</p>
                            <p className='fs-5'>Learn the essentials of front end web development with HTML, CSS, JavaScript and popular frameworks such as Bootstrap, React and Angular. Build dynamic, interactive web pages and web applications that are optimized for user experience and responsiveness.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={backEnd}
                            alt="Back End Web Dev"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Back End Web Development</p>
                            <p className='fs-5'>Our Back End Web Development curriculum teaches you the foundations of server-side programming, database management, and API integration to create dynamic web applications. You'll learn to use popular frameworks and tools to build scalable and secure web systems for modern web development.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={webDesign}
                            alt="Web Design"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>UI / UX Web Design</p>
                            <p className='fs-5'>Learn how to create visually appealing and user-friendly websites with our Web Design curriculum. Our course covers design principles, color theory, typography, and more to help you build stunning websites from scratch.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={contentCreate}
                            alt="Content Creation"
                        />

                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Content Creation</p>
                            <p className='fs-5'>In our Content Creation curriculum, learn how to create engaging and high-quality content for various platforms, from writing blog posts to producing videos. Develop your creative skills and create content that stands out in today's digital landscape.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={dataAnalyst}
                            alt="Data Analytics"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Data Analytics</p>
                            <p className='fs-5'>Looking to learn how to analyze data and derive insights? Our Data Analytics curriculum provides you with the skills to collect, process, and interpret data to make informed business decisions. Enroll now and gain valuable experience with tools like SQL, Python, and Tableau.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={socialMarket}
                            alt="Social Media Marketing"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Social Media Marketing</p>
                            <p className='fs-5'>Learn how to leverage social media platforms to grow your brand, engage with your audience, and increase your sales through our Social Media Marketing curriculum. Our expert instructors will teach you the latest techniques and strategies to build effective social media campaigns that will help you achieve your business goals.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={graphicDesign}
                            alt="Graphic Design"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>General Graphic Design</p>
                            <p className='fs-5'>Learn the fundamental principles of graphic design and gain practical skills in creating visual designs for various media platforms. With expert instructors and hands-on projects, you'll develop a solid foundation in design and unlock your creativity in the world of graphic design.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={gameDev}
                            alt="Mobile Game Development"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Mobile Game Development</p>
                            <p className='fs-5'>Learn how to create engaging and addictive games that can be played on smartphones and tablets. With step-by-step instruction, you'll discover the tools, techniques, and strategies needed to bring your game ideas to life and take your career in game development to the next level.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={bookKeeping}
                            alt="Bookkeeping"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Bookkeeping</p>
                            <p className='fs-5'>Learn the fundamental principles of accounting and bookkeeping and develop the skills needed to manage financial records for individuals or businesses with our comprehensive Bookkeeping curriculum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={responsiveWeb}
                            alt="Responsive Web Design"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Responsive Web Design</p>
                            <p className='fs-5'>Master the art of responsive web design with this curriculum. Discover the principles of design and development that make websites adaptable to any device or screen size. Learn how to create responsive layouts and optimize content for faster loading and improved user engagement.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={machineLearning}
                            alt="Machine Learning"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Machine Learning</p>
                            <p className='fs-5'>Learn how to teach machines to learn and make decisions on their own with our Machine Learning curriculum. From data preprocessing to building and evaluating models, you'll gain the skills you need to create intelligent software systems.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 rounded-3"
                            src={manageDB}
                            alt="Relational Database Management"
                        />
                        <Carousel.Caption className='caption p-5 position-absolute d-flex flex-column align-items-center justify-content-center'>
                            <p className='fs-4'>Relational Database Management</p>
                            <p className='fs-5'>Learn how to design and manage relational databases with our comprehensive curriculum. This course will equip you with the necessary skills to effectively manage data using SQL, optimize database performance, and create scalable data models.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    )
}

export default CurriculumCarousel