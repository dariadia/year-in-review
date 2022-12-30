import { isEmpty } from "lodash"
import { FC } from "react"
import { Trans } from "react-i18next"
import { YearInReviewBook, YearInReviewBooks, PersonalData, QuizData } from "types/data"
import { getReducedNumber, urlHelper } from "./CountryDataShowcase"

const GraphBooksLengthCaption: FC<{ books: YearInReviewBook[] }> = ({ books }) => {
  const longestBook = books.find(book => book.label === 'longest_book')
  const shortestBook = books.find(book => book.label === 'shortest_book')
  {/** @ts-ignore */ }
  return (<Trans
    i18nKey="reading_stats_desc"
    values={{
      authorLongestBook: longestBook?.authors
        .map(author => author.author_name)
        .join(', '),
      titleLongestBook: longestBook?.title,
      pagesLongestBook: longestBook?.pages_count,
      authorShortestBook: shortestBook?.authors
        .map(author => author.author_name)
        .join(', '),
      titleShortestBook: shortestBook?.title,
      pagesShortestBook: shortestBook?.pages_count,
    }}
  />
  )
}

const GraphBooks = ({
  data,
  withCaptions,
  isDesktop,
  isTablet,
}: {
  data: YearInReviewBooks
  withCaptions?: boolean
  isDesktop: boolean
  isTablet: boolean
}) => (
  <div className="books-graph">
    <GraphLegend
      width={
        isDesktop
          ? GRAPH_DESKTOP.GRAPH_WIDTH
          : isTablet
            ? GRAPH_TABLET.GRAPH_WIDTH
            : window?.innerWidth > 330
              ? GRAPH_MOBILE.GRAPH_WIDTH
              : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
      }
      max={data?.max_pages as number}
      quantityValue="pages"
      isDesktop={isDesktop || isTablet}
    />
    <div
      className="books-graph__axis-wrapper"
      style={{
        width: `${isDesktop
          ? GRAPH_DESKTOP.GRAPH_WIDTH
          : isTablet
            ? GRAPH_TABLET.GRAPH_WIDTH
            : window?.innerWidth > 330
              ? GRAPH_MOBILE.GRAPH_WIDTH
              : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
          }px`,
      }}
    >
      {getGraphAxis(isDesktop || isTablet)}
    </div>
    <div className="books-graph__bars">
      {data?.books.map(book => (
        <GraphBar
          withCaptions={withCaptions}
          key={book.uuid}
          stepSize={getPxStepSize({
            size: isDesktop
              ? GRAPH_DESKTOP.GRAPH_WIDTH
              : isTablet
                ? GRAPH_TABLET.GRAPH_WIDTH
                : window?.innerWidth > 330
                  ? GRAPH_MOBILE.GRAPH_WIDTH
                  : GRAPH_MOBILE_SMALL.GRAPH_WIDTH,
            count: data?.max_pages as number,
          })}
          barHeight={getPxStepSize({
            size: isDesktop
              ? GRAPH_DESKTOP.GRAPH_HEIGHT
              : isTablet
                ? GRAPH_TABLET.GRAPH_HEIGHT
                : GRAPH_MOBILE.GRAPH_HEIGHT,
            count: data?.books.length,
          })}
          pagesCount={book.pages_count as number}
          hex={book.hex}
          uuid={book.uuid}
          title={book.title}
          authors={book.authors}
          cover={book.cover}
          label={book.label}
          sizedAs={
            isDesktop
              ? GRAPH_DESKTOP.GRAPH_WIDTH
              : isTablet
                ? GRAPH_TABLET.GRAPH_WIDTH
                : GRAPH_MOBILE.GRAPH_WIDTH
          }
        />
      ))}
    </div>

    <GraphLegend
      width={
        isDesktop
          ? GRAPH_DESKTOP.GRAPH_WIDTH
          : isTablet
            ? GRAPH_TABLET.GRAPH_WIDTH
            : window?.innerWidth > 330
              ? GRAPH_MOBILE.GRAPH_WIDTH
              : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
      }
      max={data?.max_pages as number}
      quantityValue="pages"
      isDesktop={isDesktop}
    />
  </div>
)

const getGraphAxis = (isDesktop: boolean) => {
  const graphAxis: JSX.Element[] = []
  const max = isDesktop ? GRAPH_DESKTOP.GRAPH_BARS : GRAPH_MOBILE.GRAPH_BARS
  for (let i = 0; i <= max; i++) {
    graphAxis.push(<div className="books-graph__axis" />)
  }
  return graphAxis
}

const GRAPH_DESKTOP = { GRAPH_BARS: 10, GRAPH_WIDTH: 824, GRAPH_HEIGHT: 400 }

const GRAPH_TABLET = { GRAPH_BARS: 10, GRAPH_WIDTH: 700, GRAPH_HEIGHT: 400 }

const GRAPH_MOBILE = { GRAPH_BARS: 5, GRAPH_WIDTH: 312, GRAPH_HEIGHT: 400 }

const GRAPH_MOBILE_SMALL = {
  GRAPH_BARS: 4,
  GRAPH_WIDTH: 260,
  GRAPH_HEIGHT: 400,
}

const getGraphSteps = ({
  max,
  isDesktop,
}: {
  max: number
  isDesktop: boolean
}): number[] => {
  const MIN = 0
  const divider = isDesktop
    ? GRAPH_DESKTOP.GRAPH_BARS
    : window?.innerWidth > 330
      ? GRAPH_MOBILE.GRAPH_BARS
      : GRAPH_MOBILE_SMALL.GRAPH_BARS
  const stepVal = Math.round(max / divider)
  const steps = [MIN]
  for (let step = stepVal; step <= max; step += stepVal) {
    steps.push(step)
  }
  return steps
}

const GraphLegend = ({
  max,
  quantityValue,
  isDesktop,
  width,
}: {
  max: number
  quantityValue: string
  isDesktop: boolean
  width?: number
}): JSX.Element => (
  <div className="books-graph__legend" style={{ width }}>
    {getGraphSteps({
      max,
      isDesktop,
    }).map(step => (
      <span className="books-graph__step-label" key={`graph-step-${step}`}>
        {quantityValue === 'hours' && step}{' '}
        <Trans
          id={`year-in-review.${quantityValue}`}
          values={{ count: step }}
        />
      </span>
    ))}
  </div>
)

const getPxStepSize = ({
  count,
  size,
}: {
  count: number
  size: number
}): number => size / count

const GraphBar = ({
  withCaptions,
  stepSize,
  pagesCount,
  barHeight,
  hex = '#c1f642',
  cover,
  title,
  authors,
  uuid,
  label,
  type = 'book',
  sizedAs,
}: {
  withCaptions?: boolean
  stepSize: number
  pagesCount: number
  barHeight: number
  hex?: string
  cover: string
  title: string
  authors: { author_name: string; uuid: string }[]
  uuid: string
  label?: string
  type?: string
  sizedAs: number
}) => {
  const barWidth = stepSize * pagesCount
  const CAPTION_HEIGHT = 32
  const BORDER_GAP = 2
  const BOX_WIDTH = 204
  const midPoint = barWidth / 2
  const MAX_ALLOWED_LEFT =
    midPoint + BOX_WIDTH < sizedAs ? `${midPoint}px` : `${30}px`
  return (
    <>
      <div
        className={`books-graph__bar${withCaptions ? ' with-captions' : ''}`}
        style={{
          width: `${stepSize * pagesCount}px`,
          height: withCaptions
            ? barHeight - CAPTION_HEIGHT - BORDER_GAP
            : barHeight - BORDER_GAP,
          background: hex,
        }}
      >
        <a href={urlHelper.resource(uuid, type)} target="_blank">
          <div
            className="books-graph__bar__tooltip"
            style={{ left: MAX_ALLOWED_LEFT }}
          >
            <img src={cover} alt={title} className="bar__resource-cover" />
            <div className="books-graph__bar__tooltip-body">
              {authors.map((author, index) => (
                <>
                  <a href={urlHelper.author(author.uuid)} target="_blank">
                    {author.author_name}
                  </a>
                  {index < authors.length - 1 && ', '}
                </>
              ))}
              <br />
              <a href={urlHelper.resource(uuid, type)} target="_blank">
                {title}
              </a>
            </div>
          </div>
        </a>
      </div>
      {withCaptions && (
        <div className="bar-caption">
          <Trans id={`year-in-review.${label}`} />
        </div>
      )}
    </>
  )
}

export const YearInReviewPersonal = ({
  personal,
  quiz,
  isDesktop,
  isTablet,
}: {
  personal?: PersonalData
  quiz?: QuizData
  isDesktop: boolean
  isTablet: boolean
}): JSX.Element => (
  <section className="yourcompany-2022__personal">
    <div className="yourcompany-2022__column">
      <h2>
        <Trans
          i18nKey="you_yourcompany_2022"
          components={{ accented: <span className="accented_orange" /> }}
        />
      </h2>
      <p>
        <Trans id="year-in-review.personal_lead_in" />
      </p>
      {personal?.books_finished_count &&
        personal.books_read.books.length > 1 ? (
        <>
          <article>
            <h2>
              <Trans
                i18nKey="personal_books_heading"
                components={{ accented: <span className="accented_orange" /> }}
              />
            </h2>
            <p>
              <Trans i18nKey="personal_books_desc" />
            </p>

            <div className="personal_stats">
              <div className="personal_stats-item">
                <Trans
                  i18nKey="finished_books"
                  values={{
                    count: getReducedNumber(
                      personal?.books_finished_count as number,
                    ),
                  }}
                />
                <div className="personal_stats__wrapper">
                  <img
                    className="personal_stats__decor pink"
                    src="https://a.bmstatic.com/iu/126/13/Star 6-5e194fb195ac8fa1938a4db5bf75278f.svg"
                    alt="decor"
                  />
                  <span className="personal_stats__count pink">
                    {personal?.books_finished_count}
                  </span>
                </div>
              </div>
              <div className="personal_stats-item">
                <Trans
                  i18nKey="pages_read"
                  values={{ count: personal?.pages_read }}
                />
                <div className="personal_stats__wrapper">
                  <img
                    className="personal_stats__decor orange"
                    src="https://a.bmstatic.com/iu/78/17/Fill 1095-fa2ceece17373cfe09f433704df09587.svg"
                    alt="decor"
                  />
                  <span className="personal_stats__count orange">
                    {getReducedNumber(personal?.pages_read as number)}
                  </span>
                </div>
              </div>
              <div className="personal_stats-item">
                <span className="text_capitalised">
                  <Trans
                    i18nKey="hours"
                    values={{ count: personal?.hours_read }}
                  />
                </span>
                <div className="personal_stats__wrapper">
                  <img
                    className="personal_stats__decor yellow"
                    src="https://a.bmstatic.com/iu/142/164/Fill 995-8d2230efca01e4f71b97da86cb525ff7.svg"
                    alt="decor"
                  />
                  <span className="personal_stats__count yellow">
                    {getReducedNumber(personal?.hours_read as number)}
                  </span>
                </div>
              </div>
            </div>

            <GraphBooks
              data={personal?.books_read as YearInReviewBooks}
              isDesktop={isDesktop}
              isTablet={isTablet}
            />
          </article>

        </>
      ) : null}
      {personal?.audiobooks_finished_count &&
        personal.audiobooks_listened.audiobooks.length > 1 &&
        personal?.audiobooks_listened.max_hours >= 5 ? (
        <>
          <article>
            <h2>
              <Trans
                i18nKey="personal_audiobooks_heading"
                components={{ accented: <span className="accented_orange" /> }}
              />
            </h2>

            <p>
              <Trans i18nKey="personal_audiobooks_desc" />
            </p>
            <div className="personal_stats">
              <div className="personal_stats-item">
                <Trans
                  i18nKey="finished_audiobooks"
                  values={{
                    count: getReducedNumber(
                      personal?.audiobooks_finished_count as number,
                    ),
                  }}
                />
                <div className="personal_stats__wrapper">
                  <img
                    className="personal_stats__decor pink"
                    src="https://a.bmstatic.com/iu/126/13/Star 6-5e194fb195ac8fa1938a4db5bf75278f.svg"
                    alt="decor"
                  />
                  <span className="personal_stats__count pink">
                    {personal?.audiobooks_finished_count}
                  </span>
                </div>
              </div>
              <div className="personal_stats-item">
                <span className="text_capitalised">
                  <Trans
                    i18nKey="hours"
                    values={{ count: personal?.hours_listened }}
                  />
                </span>
                <div className="personal_stats__wrapper">
                  <img
                    className="personal_stats__decor yellow"
                    src="https://a.bmstatic.com/iu/142/164/Fill 995-8d2230efca01e4f71b97da86cb525ff7.svg"
                    alt="decor"
                  />
                  <span className="personal_stats__count yellow">
                    {getReducedNumber(personal?.hours_listened as number)}
                  </span>
                </div>
              </div>
            </div>

            <div className="books-graph">
              <GraphLegend
                max={personal?.audiobooks_listened.max_hours as number}
                quantityValue="hours"
                isDesktop={isDesktop || isTablet}
                width={
                  isDesktop
                    ? GRAPH_DESKTOP.GRAPH_WIDTH
                    : isTablet
                      ? GRAPH_TABLET.GRAPH_WIDTH
                      : window?.innerWidth > 330
                        ? GRAPH_MOBILE.GRAPH_WIDTH
                        : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
                }
              />

              <div
                className="books-graph__axis-wrapper"
                style={{
                  width: `${isDesktop
                    ? GRAPH_DESKTOP.GRAPH_WIDTH
                    : isTablet
                      ? GRAPH_TABLET.GRAPH_WIDTH
                      : window?.innerWidth > 330
                        ? GRAPH_MOBILE.GRAPH_WIDTH
                        : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
                    }px`,
                }}
              >
                {getGraphAxis(isDesktop)}
              </div>
              <div className="books-graph__bars">
                {personal?.audiobooks_listened.audiobooks.map(audiobook => (
                  <GraphBar
                    key={audiobook.uuid}
                    stepSize={getPxStepSize({
                      size: isDesktop
                        ? GRAPH_DESKTOP.GRAPH_WIDTH
                        : isTablet
                          ? GRAPH_TABLET.GRAPH_WIDTH
                          : window?.innerWidth > 330
                            ? GRAPH_MOBILE.GRAPH_WIDTH
                            : GRAPH_MOBILE_SMALL.GRAPH_WIDTH,
                      count: personal?.audiobooks_listened.max_hours as number,
                    })}
                    barHeight={getPxStepSize({
                      size: isDesktop
                        ? GRAPH_DESKTOP.GRAPH_HEIGHT
                        : isTablet
                          ? GRAPH_TABLET.GRAPH_HEIGHT
                          : GRAPH_MOBILE.GRAPH_HEIGHT,
                      count: personal?.audiobooks_listened.audiobooks.length,
                    })}
                    pagesCount={audiobook.hours as number}
                    hex={audiobook.hex}
                    uuid={audiobook.uuid}
                    title={audiobook.title}
                    authors={audiobook.authors}
                    cover={audiobook.cover}
                    type="audiobook"
                    sizedAs={
                      isDesktop
                        ? GRAPH_DESKTOP.GRAPH_WIDTH
                        : isTablet
                          ? GRAPH_TABLET.GRAPH_WIDTH
                          : window?.innerWidth > 330
                            ? GRAPH_MOBILE.GRAPH_WIDTH
                            : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
                    }
                  />
                ))}
              </div>

              <GraphLegend
                width={
                  isDesktop
                    ? GRAPH_DESKTOP.GRAPH_WIDTH
                    : isTablet
                      ? GRAPH_TABLET.GRAPH_WIDTH
                      : window?.innerWidth > 330
                        ? GRAPH_MOBILE.GRAPH_WIDTH
                        : GRAPH_MOBILE_SMALL.GRAPH_WIDTH
                }
                quantityValue="hours"
                max={personal?.audiobooks_listened.max_hours as number}
                isDesktop={isDesktop || isTablet}
              />
            </div>
          </article>

        </>
      ) : null}
    </div>
    {!isEmpty(quiz?.books_length) ? (
      <>
        <h2 >
          <Trans
            i18nKey="reading_stats_heading"
            components={{ accented: <span className="accented_orange" /> }}
          />
        </h2>

        <GraphBooks
          data={quiz?.books_length as YearInReviewBooks}
          withCaptions
          isDesktop={isDesktop}
          isTablet={isTablet}
        />

        <GraphBooksLengthCaption
          books={quiz?.books_length.books as YearInReviewBook[]}
        />

      </>
    ) : null}
  </section>)
