import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../../public/background/project-img1.png";
import projImg2 from "../../../public/background/project-img2.png";
import projImg3 from "../../../public/background/project-img3.png";
import colorSharp2 from "../../../public/background/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Dịch Vụ 1",
      description: "Kiểm tra miễn phí, thay thế thiết bị cân điện tử tận nơi",
      imgUrl: projImg1,
    },
    {
      title: "Dịch Vụ 2",
      description: "Kiểm tra miễn phí, thay thế thiết bị cân điện tử tận nơi",
      imgUrl: projImg2,
    },
    {
      title: "Dịch Vụ 3",
      description: "Bảo trì, cân chỉnh, kiểm định cân tận nơi khu vực Tây Nguyên",
      imgUrl: projImg3,
    },
    {
      title: "Dịch Vụ 4",
      description: "Sửa chữa, thay thế thiết bị",
      imgUrl: projImg1,
    },
    {
      title: "Dịch Vụ 5",
      description: "Sửa chữa, thay thế thiết bị",
      imgUrl: projImg2,
    },
    {
      title: "Dịch Vụ 6",
      description: "Sửa chữa, thay thế thiết bị",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 style={{ color: "white" }}>DỊCH VỤ</h2>
                  <p className="the_p"> Khi chúng tôi nhận được yêu cầu hỗ trợ từ Quý công ty, đội ngũ giàu kinh nghiệm và chuyên nghiệp của chúng tôi sẽ nhanh chóng phân tích, đánh giá và cung cấp giải pháp phù hợp nhất. Chúng tôi sẽ tiếp nhận thông tin tại mọi thời điểm và phản hồi nhanh chóng.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p className="the_p"> 
                          Cân cà phê, tiêu, cân nông sản 1tạ tới 5tạ tại ĐăkR’Lấp, ĐăkNông
                          Cân được thiết kế và sản xuất bởi Công ty Cân điện tử Quốc Hưng
                          Là loại cân chuyên dùng để cân cà phê, tiêu, nông sản…
                          Khung bàn cân được thiết kế dạng ghế vững chắc
                          Sơn tĩnh điện chống gỉ, mặt bàn cân inox dày 2mm
                          Sử dụng nguồn điện 220V, pin sạc 6V tiện lợi
                          Các chức năng: trừ bì, cộng dồn, tự động tắt khi không sử dụng…
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p className="the_p"> Loadcell cân ô tô là một loại cảm biến lực ứng dụng trong các cầu cân ô tô điện tử. Cảm biến hiện đang được sử dụng trong các loại cân ô tô từ 20 tấn đến 150 tấn. Phổ biến hiện nay cảm biến cân ô tô thường có trọng tải công suất 20 tấn, 30, 40, 50 tấn / 1 loadcell.

                          Hiện nay trên thế giới có rất nhiều hãng sản xuất loại cảm biến cân ô tô này. Tại Việt Nam ta hiện phổ biến nhập khẩu một số hãng thiết bị cân hàng đầu. Được sử dụng hàng đầu đó là các mã sản phẩm Keli, Mettler toledo, Cas, Zemic, Ohaus.. Cụ thể chi tiết các model của từng hãng sẽ được chúng tôi giới thiệu dưới đây.

                          Ngoài việc ứng dụng cho các cầu cân ô tô ra. Các model loadcell dưới đây có thể được sử dụng trong các ứng dụng công nghiệp khác, các sản phẩm định lượng tự động hóa phù hợp với nó.</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}