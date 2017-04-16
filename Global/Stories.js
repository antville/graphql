Stories.__defineGetter__('graphql', function() {
  var graphql = Packages.graphql;

  var newArgument = graphql.schema.GraphQLArgument.newArgument;
  var newEnum = graphql.schema.GraphQLEnumType.newEnum;
  var newFieldDefinition = graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
  var newObject = graphql.schema.GraphQLObjectType.newObject;

  var list = graphql.schema.GraphQLList.list;
  var nonNull = graphql.schema.GraphQLNonNull.nonNull;

  var GraphQLFloat = graphql.Scalars.GraphQLFloat;
  var GraphQLID = graphql.Scalars.GraphQLID;
  var GraphQLInt = graphql.Scalars.GraphQLInt;
  var GraphQLString = graphql.Scalars.GraphQLString;
  var GraphQLTypeReference = graphql.schema.GraphQLTypeReference;

  return {
    queryType: newObject()
      .name('Story')
      .description('A story')
      .field(
        newFieldDefinition()
          .name('id')
          .description('The ID of the story')
          .type(nonNull(GraphQLID))
      )
      .field(
        newFieldDefinition()
          .name('url')
          .description('The URL of the story')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('title')
          .description('The title of the story')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('description')
          .description('The description of the story')
          .type(GraphQLString)
      )
      .field(
        newFieldDefinition()
          .name('creator')
          .description('The original author of the story')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('created')
          .description('The datetime the story was created')
          .type(nonNull(GraphQLString))
      )
      .build(),

    dataFetcher: {
      get: function(env) {
        var site = Site.getById(env.source.id);

        if (!site) return [];

        var index = env.arguments.get('index') || 0;
        var max = Math.min(env.arguments.get('max') || 10, 10);

        return site.stories.list(index, max).map(function(story) {
          return {
            id: story._id,
            url: story.href(),
            title: story.title || formatDate(story.created, 'date'),
            description: story.text,
            creator: story.creator.name,
            created: story.created.toString()
          };
        });
      }
    }
  };
});
