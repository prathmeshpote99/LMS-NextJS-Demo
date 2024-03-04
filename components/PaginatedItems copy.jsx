import { useEffect, useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import search__category from "../assets/images/data/search-category";
function Items({ currentItems }) {
	return (
		<>
			{currentItems &&
				currentItems.map(({ img, title, link, fav, price }, i) => (
					<div className="col-sm-6 col-md-4 col-lg-6 col-xl-3" key={i}>
						<div className="library__item">
							<div className="library__item-img">
								<img src={img} alt="" />
								{fav ? (
									<Link to="#" className="fav-icon">
										{<BsFillHeartFill />}
									</Link>
								) : (
									<Link to="#" className="fav-icon">
										<BsHeart />
									</Link>
								)}
							</div>
							<div className="library__item-cont">{title}</div>
							<div className="d-flex align-items-center justify-content-between mt-2">
								<div className="text-base">
									{price === 0 ? (
										<span className="text-green">Free</span>
									) : (
										`$${price}`
									)}
								</div>
								<Link to={link} className="details-btn">
									Details
								</Link>
							</div>
						</div>
					</div>
				))}
		</>
	);
}
function PaginatedItems({ itemsPerPage }) {
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(search__category.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(search__category.length / itemsPerPage));
	}, [itemOffset, itemsPerPage]);

	const handlePageClick = (event) => {
		const newOffset =
			(event.selected * itemsPerPage) % search__category.length;
		
		setItemOffset(newOffset);
	};
	return (
		<>
			<Items currentItems={currentItems} />
			<div className="pagination-items">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					pageRangeDisplayed={3}
					onPageChange={handlePageClick}
					pageCount={pageCount}
					previousLabel="<"
					renderOnZeroPageCount={null}
				/>
			</div>
		</>
	);
}

export default PaginatedItems;
