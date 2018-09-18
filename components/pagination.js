import React from 'react'

export default class Pagination extends React.Component {
  render () {
    const { page, pages, limit } = this.props.pagination

    if (pages <= 1) {
      return <></>
    }
    return <div>
      <ul>
        {
          [... new Array(pages)]
            .map((x, i) => <li>
              <a
                key={ `page-${i + 1}` }
                href={ `/projects/${i + 1}` }
                className={ (parseInt(page, 10) === (i + 1)) ? 'active' : '' }
              >{ i + 1 }</a>
            </li>)
        }

      </ul>
      <style jsx>{`
        ul {
          width: 100%;
          background: rgba(0,0,0, 0.5);
          display: flex;
          justify-content: center;
        }
        li a {
          padding: 10px 20px;
          display: block;
        }
        .active {
          background: gold;
          color: black;
          border-radius: 4px;
        }
      `}</style>
    </div>
  }
}
