const RecordModel = require('../models/record');

const fetchRecordsWithinRange = async ({
  startDate, endDate, minCount, maxCount,
}) => {
  const pipeline = [
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new Date(startDate),
            },
          },
          {
            createdAt: {
              $lte: new Date(endDate),
            },
          },
        ],
      },
    },
    {
      $addFields: {
        totalCount: {
          $sum: '$counts',
        },
      },
    },
    {
      $match: {
        $and: [
          {
            totalCount: {
              $lte: maxCount,
            },
          },
          {
            totalCount: {
              $gte: minCount,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    },
  ];

  return RecordModel.aggregate(pipeline);
};

module.exports = {
  fetchRecordsWithinRange,
};
